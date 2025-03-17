import { cors } from "@elysiajs/cors"
import { Elysia, t } from "elysia"
import { stripe, webhookSecret } from "@/lib/stripe"
import type { Stripe } from "stripe"
import { assertString } from "@/lib/assert"

const app = new Elysia()
	.onError(({ error }) => {
		console.log(error, "error")
		return new Response(error.toString())
	})
	.use(cors())
	.get("/test", async () => {
		return "ok"
	})
	.post(
		"/create-product",
		async ({ body }) => {
			const { productTitle, productDescription, productPrice, productRoninId, userBuyingId } = body
			const session = await stripe.checkout.sessions.create({
				success_url: "https://solbond.co/payment-success",
				line_items: [
					{
						price_data: {
							currency: "usd",
							product_data: {
								name: productTitle,
								description: productDescription,
								images: ["https://storage.ronin.co/spa_vtavi6txvlhef4ja/3d8e4d1a-eae9-4e48-8c8f-c836cf710082"]
							},
							unit_amount: Math.round(Number(productPrice) * 100)
						},
						quantity: 1
					}
				],
				mode: "payment",
				payment_intent_data: {
					metadata: {
						productRoninId,
						userBuyingId
					}
				}
			})
			const checkoutSessionUrl = session.url
			return checkoutSessionUrl
		},
		{
			body: t.Object({
				productTitle: t.String(),
				productRoninId: t.String(),
				productDescription: t.String(),
				productPrice: t.String(),
				userBuyingId: t.String()
			})
		}
	)
	.post("/webhooks/stripe/payment-success", async ({ headers, error, request }) => {
		let event: Stripe.Event

		assertString(webhookSecret)

		const signature = headers["stripe-signature"]

		if (!signature) {
			return error(400, "missing signature")
		}

		const payload = await request.text()

		console.log(payload, "payload")

		try {
			event = await stripe.webhooks.constructEventAsync(payload, signature, webhookSecret)
		} catch (err: unknown) {
			const errorMessage = err instanceof Error ? err.message : "Unknown error"
			console.error(err)
			console.error(`[stripe-webhook] Error message: ${errorMessage}`)

			return error(400, `Webhook Error: ${errorMessage}`)
		}

		// Successfully constructed event.
		console.log("[stripe-webhook] Success:", event.id)

		try {
			switch (event.type) {
				case "payment_intent.succeeded":
					const paymentIntent = event.data.object as Stripe.PaymentIntent
					console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`)

					console.log("---------------")
					console.log(paymentIntent.metadata, "metadata")
					console.log("---------------")

					const productRoninId = paymentIntent.metadata.productRoninId
					const userBuyingId = paymentIntent.metadata.userBuyingId

					//
					// user.boughtProducts.push(..)

					break
				default:
					// Unexpected event type
					console.log(`Unhandled event type ${event.type}.`)
			}
		} catch (err) {
			console.error("[stripe-webhook] Error handling event:", err)
			return error(500, "Error handling event")
		}

		return { message: "Received" }
	})
	.listen(process.env.PORT ?? 8787)

export type App = typeof app

console.log(`Server is running at ${app.server?.hostname}:${app.server?.port}`)
