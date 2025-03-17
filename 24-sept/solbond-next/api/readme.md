# API

Using [Elysia](https://elysiajs.com/).

There is [Eden](https://elysiajs.com/eden/overview.html) for type safe access on client.

For now API is only used for [Stripe](https://stripe.com) / [Sphere Pay](https://spherepay.co) webhooks.

## Stripe

There is webhook endpoint that listens in to events from Stripe and does things.

### Test Stripe events locally

Assumes you are logged in with `stripe login`.

Then run this in 1 tab: `stripe listen --forward-to localhost:8787/webhooks/stripe/payment-success`

And this in another tab: `bun dev`

You can then run `stripe trigger checkout.session.completed` in another tab to trigger `checkout.session.completed` event.

Check logs in server (from `bun run` command) for errors.

[Use incoming webhooks to get real-time updates](https://stripe.com/docs/webhooks) is a good read.
