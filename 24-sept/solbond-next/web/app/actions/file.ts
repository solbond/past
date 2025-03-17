"use server"

import { create, drop } from "ronin"
import { z } from "zod"
import { ZSAError } from "zsa"
import { authedProcedure } from "@/lib/helpers/auth"

export const storeFile = authedProcedure
	.input(
		z.object({
			file: z.custom<File>()
		}),
		{ type: "formData" }
	)
	.handler(async ({ ctx, input }) => {
		const { file } = input
		const { roninUser } = ctx

		if (!roninUser) {
			throw new ZSAError("NOT_AUTHORIZED", "You are not authorized to upload files")
		}

		const fileModel = await create.file.with({
			content: file,
			user: roninUser.id,
			name: file.name,
			type: file.type,
			size: file.size
		})

		return { fileModel }
	})

export const deleteFile = authedProcedure.input(z.object({ id: z.string() })).handler(async ({ ctx, input }) => {
	const { id } = input
	const { roninUser } = ctx

	if (!roninUser) {
		throw new ZSAError("NOT_AUTHORIZED", "You are not authorized to delete files")
	}

	await drop.file.with.id(id)
})
