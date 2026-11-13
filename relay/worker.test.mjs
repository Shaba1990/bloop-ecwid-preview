import assert from "node:assert/strict";
import worker, { __resetForTests } from "./worker.js";

const ORIGIN = "https://bloopifyhub.com";
const ENV = { ECWID_SECRET_TOKEN: "secret_test", ECWID_STORE_ID: "138742751" };

function post(body, extra = {}) {
  return new Request("https://relay.example/subscribe", {
    method: "POST",
    headers: {
      Origin: ORIGIN,
      "Content-Type": "application/json",
      "CF-Connecting-IP": extra.ip || "203.0.113.10",
      ...(extra.headers || {}),
    },
    body: JSON.stringify(body),
  });
}

async function read(response) {
  return { status: response.status, json: await response.json(), headers: response.headers };
}

let calls;

function installFetch(handler) {
  calls = [];
  globalThis.fetch = async (url, opts) => {
    calls.push({ url: String(url), opts });
    return handler(String(url), opts || {});
  };
}

function ecwidOk(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json" } });
}

beforeEach();
function beforeEach() {
  __resetForTests();
}

const tests = [];
function test(name, fn) { tests.push({ name, fn }); }

test("rejects origins other than the live site", async () => {
  installFetch(() => { throw new Error("ecwid should not be called"); });
  const response = await worker.fetch(post({ email: "a@b.co" }, { headers: { Origin: "https://evil.example" } }), ENV);
  assert.equal(response.status, 403);
  assert.equal(response.headers.get("access-control-allow-origin"), null);
  assert.equal(calls.length, 0);
});

test("allows the www origin and answers preflight", async () => {
  const denied = await worker.fetch(new Request("https://relay.example/", {
    method: "OPTIONS",
    headers: { Origin: "http://localhost:8080" },
  }), ENV);
  assert.equal(denied.status, 403);
  const ok = await worker.fetch(new Request("https://relay.example/", {
    method: "OPTIONS",
    headers: { Origin: "https://www.bloopifyhub.com", "Access-Control-Request-Method": "POST" },
  }), ENV);
  assert.equal(ok.status, 204);
  assert.equal(ok.headers.get("access-control-allow-origin"), "https://www.bloopifyhub.com");
});

test("rejects a bad email without calling Ecwid", async () => {
  installFetch(() => { throw new Error("ecwid should not be called"); });
  const response = await read(await worker.fetch(post({ email: "not-an-email" }, { ip: "203.0.113.11" }), ENV));
  assert.equal(response.status, 400);
  assert.deepEqual(response.json, { ok: false, error: "invalid_email" });
  assert.equal(calls.length, 0);
});

test("honeypot returns success and does not call Ecwid", async () => {
  installFetch(() => { throw new Error("ecwid should not be called"); });
  const response = await read(await worker.fetch(post({ email: "bot@example.com", bloop_hp: "filled" }, { ip: "203.0.113.12" }), ENV));
  assert.equal(response.status, 200);
  assert.deepEqual(response.json, { ok: true, status: "created" });
  assert.equal(calls.length, 0);
});

test("creates a customer with marketing consent and the Newsletter group", async () => {
  installFetch(async (url, opts) => {
    if (url.includes("/customers?")) return ecwidOk({ total: 0, items: [] });
    if (url.includes("/customer_groups") && opts.method === "GET") return ecwidOk({ items: [] });
    if (url.includes("/customer_groups") && opts.method === "POST") return ecwidOk({ id: 55 });
    if (url.endsWith("/customers") && opts.method === "POST") return ecwidOk({ id: 99 });
    throw new Error("unexpected " + opts.method + " " + url);
  });
  const response = await read(await worker.fetch(post({ email: "New.Person@Example.com" }, { ip: "203.0.113.13" }), ENV));
  assert.equal(response.status, 200);
  assert.deepEqual(response.json, { ok: true, status: "created" });
  const create = calls.find((call) => call.opts.method === "POST" && call.url.endsWith("/customers"));
  assert.ok(create);
  assert.equal(create.opts.headers.Authorization, "Bearer secret_test");
  assert.equal(create.url, "https://app.ecwid.com/api/v3/138742751/customers");
  const body = JSON.parse(create.opts.body);
  assert.equal(body.email, "new.person@example.com");
  assert.equal(body.acceptMarketing, true);
  assert.equal(body.customerGroupId, 55);
  const lookup = calls.find((call) => call.url.includes("/customers?"));
  assert.match(lookup.url, /useExactEmailMatch=true/);
  assert.match(lookup.url, /email=new\.person%40example\.com/);
});

test("updates acceptMarketing when the email already exists", async () => {
  installFetch(async (url, opts) => {
    if (url.includes("useExactEmailMatch=true")) {
      return ecwidOk({ items: [{ id: 42, email: "ada@example.com", acceptMarketing: false, customerGroupId: 7 }] });
    }
    if (opts.method === "PUT") return ecwidOk({ updateCount: 1 });
    throw new Error("unexpected " + opts.method + " " + url);
  });
  const response = await read(await worker.fetch(post({ email: "ada@example.com" }, { ip: "203.0.113.14" }), ENV));
  assert.deepEqual(response.json, { ok: true, status: "updated" });
  const update = calls.find((call) => call.opts.method === "PUT");
  assert.equal(update.url, "https://app.ecwid.com/api/v3/138742751/customers/42");
  assert.deepEqual(JSON.parse(update.opts.body), { acceptMarketing: true });
});

test("still creates a customer if the Newsletter group cannot be saved", async () => {
  installFetch(async (url, opts) => {
    if (url.includes("/customers?")) return ecwidOk({ items: [] });
    if (url.includes("/customer_groups")) return ecwidOk({ errorCode: "FORBIDDEN" }, 403);
    if (url.endsWith("/customers") && opts.method === "POST") return ecwidOk({ id: 3 });
    throw new Error("unexpected " + opts.method + " " + url);
  });
  const response = await read(await worker.fetch(post({ email: "no-group@example.com" }, { ip: "203.0.113.15" }), ENV));
  assert.deepEqual(response.json, { ok: true, status: "created" });
  const body = JSON.parse(calls.find((call) => call.opts.method === "POST").opts.body);
  assert.equal(body.acceptMarketing, true);
  assert.equal(body.customerGroupId, undefined);
});

test("rate-limits an address after repeated posts", async () => {
  installFetch(async () => ecwidOk({ items: [{ id: 1, email: "rate@example.com" }] }));
  let last;
  for (let i = 0; i < 9; i++) {
    last = await read(await worker.fetch(post({ email: "rate@example.com" }, { ip: "203.0.113.16" }), ENV));
  }
  assert.equal(last.status, 429);
  assert.deepEqual(last.json, { ok: false, error: "rate_limited" });
});

let failed = 0;
for (const { name, fn } of tests) {
  __resetForTests();
  try {
    await fn();
    console.log("ok", name);
  } catch (error) {
    failed += 1;
    console.error("FAIL", name);
    console.error(error);
  }
}
if (failed) process.exit(1);
