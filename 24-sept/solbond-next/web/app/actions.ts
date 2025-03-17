"use server"

import { get, set } from "ronin"
import { z } from "zod"
import { profileSchema, usernameValidation } from "@/lib/common-schema"
import { currentUser } from "@clerk/nextjs/server"
import { authedProcedure } from "@/lib/helpers/auth"

export const updateProfileAction = authedProcedure
	.input(profileSchema, { type: "formData" })
	.handler(async ({ input, ctx }) => {
		const { clerkUser } = ctx

		try {
			const response = await set.user({
				with: { email: clerkUser?.primaryEmailAddress?.emailAddress },
				to: { username: input.username }
			})

			return response
		} catch (error) {
			throw new Error("Failed to update profile")
		}
	})

export const checkUsername = authedProcedure
	.input(z.object({ username: usernameValidation }))
	.handler(async ({ input, ctx }) => {
		const { roninUser } = ctx
		const { username } = input

		if (roninUser?.username === username) {
			return { exists: false }
		}

		const user = await get.user.with({ username })
		return { exists: !!user }
	})

/*
 * Get current user from Clerk and Ronin.
 */
export const getCurrentRoninUser = async () => {
	try {
		const clerkUser = await currentUser()
		const roninUser = await get.user.with({ email: clerkUser?.primaryEmailAddress?.emailAddress })
		return roninUser
	} catch (error) {
		return null
	}
}
