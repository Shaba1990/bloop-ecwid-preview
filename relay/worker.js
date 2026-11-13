// Newsletter signup relay for bloopifyhub.com.
// The Ecwid secret token lives only in the Worker secret ECWID_SECRET_TOKEN.
// Public storefront tokens cannot create customers or set acceptMarketing.

const STORE_FALLBACK = "138742751";
const ALLOWED_ORIGINS = new Set([
  "https://bloopifyhub.com",
  "https://www.bloopifyhub.com",
]);
const EMAIL_RE = /^[a-z0-9](?:[a-z0-9._%+-]{0,62}[a-z0-9])?@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/i;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 8;
const GROUP_NAME = "Newsletter";

const buckets = new Map();
let groupMemo = { id: null, until: 0 };

export function __resetForTests() {
  buckets.clear();
  groupMemo = { id: null, until: 0 };
}

function corsHeaders(origin) {
  if (!ALLOWED_ORIGINS.has(origin)) return null;
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function json(body, status, origin) {
  const headers = { "content-type": "application/json; charset=utf-8" };
  const cors = corsHeaders(origin);
  if (cors) Object.assign(headers, cors);
  return new Response(JSON.stringify(body), { status, headers });
}

function clientIp(request) {
  return request.headers.get("CF-Connecting-IP") || request.headers.get("X-Forwarded-For") || "unknown";
}

function rateLimited(ip) {
  const now = Date.now();
  let bucket = buckets.get(ip);
  if (!bucket || now > bucket.reset) {
    bucket = { count: 0, reset: now + WINDOW_MS };
    buckets.set(ip, bucket);
  }
  bucket.count += 1;
  if (buckets.size > 5000) {
    for (const [key, value] of buckets) {
      if (now > value.reset) buckets.delete(key);
    }
  }
  return bucket.count > MAX_HITS;
}

function normalizeEmail(value) {
  if (typeof value !== "string") return "";
  const email = value.trim().toLowerCase();
  if (email.length < 6 || email.length > 254) return "";
  if (email.includes("..") || !EMAIL_RE.test(email)) return "";
  return email;
}

function sameEmail(customer, email) {
  if (!customer || typeof customer !== "object") return false;
  if (String(customer.email || "").trim().toLowerCase() === email) return true;
  const contacts = Array.isArray(customer.contacts) ? customer.contacts : [];
  return contacts.some((contact) => {
    return String(contact && contact.type || "").toUpperCase() === "EMAIL"
      && String(contact.contact || "").trim().toLowerCase() === email;
  });
}

function honeypotTripped(body) {
  return ["bloop_hp", "company", "website", "url"].some((key) => String(body[key] == null ? "" : body[key]).trim() !== "");
}

async function ecwid(env, method, path, body) {
  const store = String(env.ECWID_STORE_ID || STORE_FALLBACK).trim();
  const token = env.ECWID_SECRET_TOKEN;
  if (!token || !/^\d+$/.test(store)) return { ok: false, status: 500, data: {} };
  let response;
  try {
    response = await fetch("https://app.ecwid.com/api/v3/" + store + path, {
      method,
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
        ...(body ? { "Content-Type": "application/json" } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    return { ok: false, status: 502, data: {} };
  }
  const text = await response.text();
  let data = {};
  if (text) {
    try { data = JSON.parse(text); } catch { data = {}; }
  }
  return { ok: response.ok, status: response.status, data };
}

async function findCustomers(env, email) {
  const exactPath = "/customers?email=" + encodeURIComponent(email) + "&useExactEmailMatch=true&limit=20";
  const exact = await ecwid(env, "GET", exactPath);
  if (!exact.ok) return exact;
  let items = (exact.data.items || []).filter((customer) => sameEmail(customer, email));
  if (items.length) return { ok: true, status: 200, data: { items } };
  const loose = await ecwid(env, "GET", "/customers?email=" + encodeURIComponent(email) + "&limit=100");
  if (!loose.ok) return loose;
  items = (loose.data.items || []).filter((customer) => sameEmail(customer, email));
  return { ok: true, status: 200, data: { items } };
}

async function newsletterGroupId(env) {
  const now = Date.now();
  if (groupMemo.until > now) return groupMemo.id;
  const found = await ecwid(env, "GET", "/customer_groups?keyword=" + encodeURIComponent(GROUP_NAME) + "&limit=100");
  if (!found.ok) {
    if (found.status === 401 || found.status === 403) groupMemo = { id: null, until: now + 10 * 60 * 1000 };
    return null;
  }
  const items = found.data.items || [];
  const hit = items.find((group) => String(group.name || "").trim().toLowerCase() === GROUP_NAME.toLowerCase());
  if (hit && hit.id) {
    groupMemo = { id: hit.id, until: now + 60 * 60 * 1000 };
    return hit.id;
  }
  const created = await ecwid(env, "POST", "/customer_groups", { name: GROUP_NAME });
  if (created.ok && created.data && created.data.id) {
    groupMemo = { id: created.data.id, until: now + 60 * 60 * 1000 };
    return created.data.id;
  }
  const again = await ecwid(env, "GET", "/customer_groups?keyword=" + encodeURIComponent(GROUP_NAME) + "&limit=100");
  const retry = again.ok && (again.data.items || []).find((group) => String(group.name || "").trim().toLowerCase() === GROUP_NAME.toLowerCase());
  if (retry && retry.id) {
    groupMemo = { id: retry.id, until: now + 60 * 60 * 1000 };
    return retry.id;
  }
  groupMemo = { id: null, until: now + 10 * 60 * 1000 };
  return null;
}

async function updateMarketing(env, customers) {
  for (const customer of customers) {
    const id = customer && customer.id;
    if (!Number.isFinite(Number(id))) return { ok: false, status: 502, data: {} };
    const updated = await ecwid(env, "PUT", "/customers/" + encodeURIComponent(String(id)), { acceptMarketing: true });
    if (!updated.ok) return updated;
  }
  return { ok: true, status: 200, data: {} };
}

async function subscribe(env, email) {
  const existing = await findCustomers(env, email);
  if (!existing.ok) return { error: true, status: 502 };
  if (existing.data.items.length) {
    const updated = await updateMarketing(env, existing.data.items);
    if (!updated.ok) return { error: true, status: 502 };
    return { ok: true, status: "updated" };
  }
  const groupId = await newsletterGroupId(env);
  const payload = {
    email,
    acceptMarketing: true,
    privateAdminNotes: "Newsletter signup from bloopifyhub.com",
  };
  if (groupId) payload.customerGroupId = groupId;
  const created = await ecwid(env, "POST", "/customers", payload);
  if (created.ok) return { ok: true, status: "created" };
  const raced = await findCustomers(env, email);
  if (raced.ok && raced.data.items.length) {
    const updated = await updateMarketing(env, raced.data.items);
    if (updated.ok) return { ok: true, status: "updated" };
  }
  return { error: true, status: 502 };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    if (request.method === "OPTIONS") {
      const cors = corsHeaders(origin);
      if (!cors) return new Response(null, { status: 403 });
      return new Response(null, { status: 204, headers: cors });
    }
    if (request.method !== "POST") return json({ ok: false, error: "method" }, 405, origin);
    if (!ALLOWED_ORIGINS.has(origin)) return json({ ok: false, error: "origin" }, 403, origin);
    if (rateLimited(clientIp(request))) return json({ ok: false, error: "rate_limited" }, 429, origin);

    const type = request.headers.get("content-type") || "";
    if (!type.toLowerCase().includes("application/json")) return json({ ok: false, error: "type" }, 415, origin);
    const length = Number(request.headers.get("content-length") || 0);
    if (length > 2000) return json({ ok: false, error: "size" }, 413, origin);
    const raw = await request.text();
    if (raw.length > 2000) return json({ ok: false, error: "size" }, 413, origin);
    let body;
    try { body = JSON.parse(raw); } catch { return json({ ok: false, error: "json" }, 400, origin); }
    if (!body || typeof body !== "object" || Array.isArray(body)) return json({ ok: false, error: "json" }, 400, origin);
    if (honeypotTripped(body)) return json({ ok: true, status: "created" }, 200, origin);

    const email = normalizeEmail(body.email);
    if (!email) return json({ ok: false, error: "invalid_email" }, 400, origin);
    if (!env || !env.ECWID_SECRET_TOKEN) return json({ ok: false, error: "unavailable" }, 500, origin);

    const result = await subscribe(env, email);
    if (!result.ok) return json({ ok: false, error: "unavailable" }, result.status || 502, origin);
    return json({ ok: true, status: result.status }, 200, origin);
  },
};
