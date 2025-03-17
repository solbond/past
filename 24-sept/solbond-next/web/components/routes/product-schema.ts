import { createAvatarValidationSchema, createSlugSchema, profileSchema } from "@/lib/common-schema"
import { z } from "zod"

export const fileArraySchema = z
	.array(
		z.object({
			fileName: z.string(),
			roninId: z.string()
		})
	)
	.min(1, "At least one file must be provided")

export const baseProductSchema = z.object({
	title: z
		.string({
			message: "Title is required"
		})
		.min(1, {
			message: "Title is required"
		}),
	subtitle: z
		.string({
			message: "Subtitle is required"
		})
		.min(1, {
			message: "Subtitle is required"
		}),
	description: z
		.string({
			message: "Enter a valid description"
		})
		.optional(),
	category: z
		.string({
			message: "Please select a category"
		})
		.min(1, {
			message: "Please select a category"
		}),
	price: z
		.union([
			z
				.string({
					required_error: "Price is required"
				})
				.transform(v => v.replace(/[^0-9.-]+/g, "")),
			z.number()
		])
		.pipe(
			z.coerce
				.number({
					required_error: "Price is required"
				})
				.min(0, {
					message: "Price must be greater than $0"
				})
				.max(9998, { message: "Price must be less than $9,999" })
		),
	fileIds: fileArraySchema,
	coverImage: createAvatarValidationSchema(false),
	productUrl: createSlugSchema("Product URL"),
	isPublished: z.coerce.number().min(0).max(1)
})

export const storeProductSchema = baseProductSchema.extend({
	fileIds: z.string().refine(
		str => {
			try {
				const parsed = JSON.parse(str)
				return fileArraySchema.safeParse(parsed).success
			} catch {
				return false
			}
		},
		{ message: "Invalid JSON string or doesn't match the expected format" }
	)
})

export const updateProductSchema = storeProductSchema.extend({
	productId: z.string(),
	path: z.string()
})

export const productFormSchema = baseProductSchema.merge(profileSchema.omit({ wallet: true }))
