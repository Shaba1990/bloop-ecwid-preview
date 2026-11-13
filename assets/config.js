// Newsletter signup relay. Leave this an empty string until the Cloudflare
// Worker in /relay is deployed. An empty value keeps the FormSubmit email
// fallback (bloop.store25@gmail.com) so the form still works.
// After deploy, set this to the Worker URL, for example:
// window.NEWSLETTER_ENDPOINT = "https://bloop-newsletter.<your-subdomain>.workers.dev";
window.NEWSLETTER_ENDPOINT = "https://bloop-newsletter.bloopifyhub.workers.dev";
