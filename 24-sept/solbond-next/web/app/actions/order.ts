"use server"

import { create, get, set } from "ronin"
import { z } from "zod"
import { ZSAError } from "zsa"
import { authedProcedure } from "@/lib/helpers/auth"

export const createOrder = authedProcedure
	.input(z.object({ productId: z.string() }))
	.handler(async ({ ctx, input }) => {
		const { productId } = input
		const { roninUser } = ctx

		if (!roninUser) {
			throw new ZSAError("NOT_AUTHORIZED", "You are not authorized to create orders")
		}

		const product = await get.product.with.id(productId)

		if (!product) {
			throw new ZSAError("NOT_FOUND", "Product not found")
		}

		const order = await create.stripePayment.with({
			product: product.id,
			amount: product.price,
			currency: product.currency,
			status: "pending",
			seller: product.createdBy,
			buyer: roninUser.id
		})

		return { product, order }
	})

export const setStripeSessionId = authedProcedure
	.input(z.object({ orderId: z.string(), sessionId: z.string() }))
	.handler(async ({ ctx, input }) => {
		const { orderId, sessionId } = input
		const { roninUser } = ctx

		if (!roninUser) {
			throw new ZSAError("NOT_AUTHORIZED", "You are not authorized to set the session ID")
		}

		const order = await get.stripePayment.with.id(orderId)
		if (!order) {
			throw new ZSAError("NOT_FOUND", "Order not found")
		}

		if (order.buyer !== roninUser.id) {
			throw new ZSAError("NOT_AUTHORIZED", "You are not authorized to set the session ID")
		}

		await set.stripePayment({
			with: {
				id: orderId
			},
			to: {
				stripeSessionId: sessionId
			}
		})

		return { order }
	})
