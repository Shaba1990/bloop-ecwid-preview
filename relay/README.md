# Bloop newsletter relay

The storefront at [bloopifyhub.com](https://bloopifyhub.com) is a static GitHub Pages site. Ecwid will not create a customer, or set marketing consent, from public storefront code.

- A **public token** can only read public catalog data and place unpaid orders. It cannot create customers. See [App settings](https://docs.ecwid.com/develop-apps/app-settings).
- The storefront JS API can only read the customer who is already signed in (`Ecwid.Customer.get`) or sign them out. It has no “subscribe this email” method. See [JS API calls](https://docs.ecwid.com/api-reference/advanced/js-api-calls).
- Creating a customer with `acceptMarketing: true` requires `POST https://app.ecwid.com/api/v3/138742751/customers` and a **secret** token. See [Create customer](https://docs.ecwid.com/api-reference/rest-api/customers/create-customer).

This Worker holds that secret and is the only thing the website talks to. The browser sends `{ "email": "person@example.com" }`. The Worker looks the email up, then either creates the customer or turns marketing consent on.

## What the Worker does

`POST` JSON `{ "email": "...", "bloop_hp": "" }`

1. Allows only `https://bloopifyhub.com` and `https://www.bloopifyhub.com`.
2. Rejects a missing or invalid email.
3. If the hidden honeypot field `bloop_hp` is filled, it pretends the signup worked and does not call Ecwid.
4. Allows 8 signups per IP address each 10 minutes.
5. `GET /customers?email=` (exact match, then a case-insensitive check).
6. If that customer exists, `PUT /customers/{id}` with `{ "acceptMarketing": true }`. Their existing customer group is left alone.
7. If not, it finds or creates a customer group named `Newsletter`, then `POST /customers` with the email, `acceptMarketing: true`, and that group. If the group cannot be saved, the customer is still created.
8. Responds with `{ "ok": true, "status": "created" }` or `{ "ok": true, "status": "updated" }`.

## Deploy on Cloudflare’s free plan

You need a free [Cloudflare](https://dash.cloudflare.com/sign-up) account. From this `relay` folder, on your own computer:

```bash
npx wrangler login
npx wrangler secret put ECWID_SECRET_TOKEN
npx wrangler deploy
```

When `wrangler secret put` asks for a value, paste the Ecwid secret token (`secret_...`). Do not put that token in `wrangler.toml`, `assets/config.js`, or any other file in this repo.

`wrangler deploy` prints a URL like `https://bloop-newsletter.<your-subdomain>.workers.dev`.

## Point the website at the Worker

In `assets/config.js`, set the URL you just got:

```js
window.NEWSLETTER_ENDPOINT = "https://bloop-newsletter.<your-subdomain>.workers.dev";
```

Commit that one-line change and push it to `main`. GitHub Pages publishes from `main`. Until this line is filled in, the form keeps emailing `bloop.store25@gmail.com` through FormSubmit, and nothing is written to Ecwid.

## Ecwid token

The Worker needs one secret token with these scopes:

- `read_customers` — look up the email and the Newsletter group
- `create_customers` — add the customer and the Newsletter group
- `update_customers` — turn `acceptMarketing` on when the email is already a customer

`create_customers` and `read_customers` alone can add a new signup. Without `update_customers`, a person who already bought something will see an error instead of being marked as accepting marketing.

How to get the token is in the pull request notes. The clicks live in Ecwid’s own docs:

- [Set up your dev environment](https://docs.ecwid.com/get-started/set-up-your-dev-environment-in-ecwid)
- [Add more features to your custom app](https://docs.ecwid.com/get-started/add-more-features-to-your-custom-app)
- [Help Center: adding features via the API](https://support.ecwid.com/hc/en-us/articles/4938302203932-Adding-more-features-to-your-store-via-Ecwid-s-API)

After you change scopes, uninstall and install the custom app again. Ecwid issues a new secret token and the old one stops working. Run `npx wrangler secret put ECWID_SECRET_TOKEN` again with the new value. You do not need to redeploy the site for a token change.

## Check that it worked

From a page on `https://bloopifyhub.com`, subscribe with a new email. Ecwid admin → Customers should show that person, with marketing accepted, in the Newsletter group. Subscribe again with the same email: the Worker returns `"updated"` and the customer stays on the list.
