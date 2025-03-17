"use server"

import type { Stripe } from "stripe"
import { formatAmountForStripe } from "@/lib/utils"
import { stripe } from "@/lib/stripe"
import { createOrder, setStripeSessionId } from "./order"
import { authedProcedure } from "@/lib/helpers/auth"
import { ZSAError } from "zsa"
import { z } from "zod"

export const createCheckoutSession = authedProcedure
	.input(z.object({ productId: z.string() }))
	.handler(async ({ ctx, input }) => {
		const { productId } = input
		const { roninUser } = ctx

		if (!roninUser) {
			throw new ZSAError("NOT_AUTHORIZED", "Unauthorized")
		}

		const [data, err] = await createOrder({ productId })

		if (err) {
			throw new ZSAError("INTERNAL_SERVER_ERROR", "Failed to create order")
		}

		const { product, order } = data

		const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: [
				{
					quantity: 1,
					price_data: {
						currency: order.currency,
						product_data: {
							name: product.title,
							description: product.description,
							images: [product.coverImage.src],
							metadata: {
								productId: product.id,
								productUrl: product.productUrl,
								productCategory: product.category
							}
						},
						unit_amount: formatAmountForStripe(order.amount, order.currency)
					}
				}
			],
			mode: "payment",
			success_url: `${process.env.NEXT_PUBLIC_APP_URL!}/payment-success/result?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${process.env.NEXT_PUBLIC_APP_URL!}/payment-failed`,
			metadata: {
				orderId: order.id,
				productId: product.id,
				buyerid: roninUser.id,
				sellerid: product.createdBy
			}
		})

		await setStripeSessionId({ orderId: order.id, sessionId: checkoutSession.id })

		return {
			client_secret: checkoutSession.client_secret,
			url: checkoutSession.url,
			sessionId: checkoutSession.id
		}
	})
