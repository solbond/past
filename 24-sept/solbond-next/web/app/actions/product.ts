"use server"

import { create, get, set, drop } from "ronin"
import { z } from "zod"
import { revalidatePath } from "next/cache"
import { storeProductSchema, updateProductSchema } from "@/components/routes/product-schema"
import { ZSAError } from "zsa"
import { authedProcedure } from "@/lib/helpers/auth"

/*
 * Store a product.
 */
export const storeProduct = authedProcedure
	.input(storeProductSchema, { type: "formData" })
	.handler(async ({ input, ctx }) => {
		const { roninUser } = ctx
		const { fileIds, isPublished, ...res } = input

		try {
			const product = await create.product.with({
				...res,
				createdBy: roninUser?.id,
				isPublished: isPublished === 1 ? true : false
			})

			const newFileIds = JSON.parse(fileIds)

			for (const fileId of newFileIds) {
				await set.file({
					with: { id: fileId.roninId },
					to: { product: product.id }
				})
			}
		} catch (error) {
			console.error(error)
			throw new ZSAError("ERROR", "Failed to submit product to sell")
		}
	})

/*
 * Update a product.
 */
export const updateProduct = authedProcedure
	.input(updateProductSchema, { type: "formData" })
	.handler(async ({ input, ctx }) => {
		const { roninUser } = ctx
		const { productId, fileIds, isPublished, path, ...res } = input

		try {
			await set.product({
				with: { id: productId, createdBy: roninUser?.id },
				to: { ...res, isPublished: isPublished === 1 ? true : false }
			})

			// important
			revalidatePath(path)
		} catch (error) {
			throw new ZSAError("ERROR", "Failed to update product")
		}
	})

/*
 * Toogle like on a product.
 */
export const toggleLike = authedProcedure
	.input(z.object({ productId: z.string(), path: z.string().optional() }))
	.handler(async ({ input, ctx }) => {
		const { roninUser } = ctx
		const { productId, path } = input

		const likedProduct = await get.likedProducts({
			with: { user: roninUser?.id, product: productId }
		})

		if (likedProduct.length) {
			await drop.likedProduct.with({ user: roninUser?.id, product: productId })
		} else {
			await create.likedProduct.with({ user: roninUser?.id, product: productId })
		}

		if (path) {
			revalidatePath(path)
		}
	})
