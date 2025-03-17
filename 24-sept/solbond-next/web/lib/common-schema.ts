import { bytesToMB } from "./utils"
import { z } from "zod"

export const usernameValidation = z
	.string()
	.min(1, { message: "Please enter your username" })
	.trim()
	.regex(/^[a-z0-9.]+$/, "Username can only contain letters (a-z), numbers (0-9), and periods (.)")
	.refine(value => !["&", "=", "_", "'", "-", "+", ",", "<", ">"].some(char => value.includes(char)), {
		message: "Username cannot contain & = _ ' - + , < >"
	})
	.refine(value => !value.includes(".."), { message: "Username cannot contain more than one period in a row" })
	.refine(value => !value.startsWith(".") && !value.endsWith("."), {
		message: "Username cannot start or end with a period"
	})

export function createAvatarValidationSchema(allowUndefined: boolean = true) {
	const fileSchema = z
		.instanceof(File, { message: "Please upload a valid image" })
		.refine(file => file.size <= 5 * 1024 * 1024, {
			message: `File size should be less than 5MB. Current size: ${(file: File) => bytesToMB(file.size).toFixed(2)}MB`
		})
		.refine(file => ["image/jpeg", "image/png", "image/gif"].includes(file.type), "File type must be JPEG, PNG, or GIF")

	return allowUndefined ? z.union([fileSchema, z.undefined()]) : fileSchema
}

export function multipleFileValidationSchema(maxSizeMB: number, maxFiles: number) {
	return z
		.array(z.instanceof(File))
		.max(maxFiles, `You can only upload up to ${maxFiles} files`)
		.min(1, "You must upload at least one file")
		.refine(files => files.every(file => file.size <= maxSizeMB * 1024 * 1024), {
			message: `File size should be less than ${maxSizeMB}MB`
		})
}

export const profileSchema = z.object({
	username: usernameValidation,
	profileImage: createAvatarValidationSchema(true).optional(),
	prettyName: z.string().min(1, {
		message: "Pretty name is required"
	}),
	wallet: z.string().optional()
})

export const createSlugSchema = (term: string = "Slug") => {
	return z
		.string()
		.min(3, `${term} must be at least 3 characters long`)
		.max(50, `${term} must not exceed 50 characters`)
		.regex(
			/^[a-z0-9]+(?:-[a-z0-9]+)*$/,
			`${term} must contain only lowercase letters, numbers, and hyphens, and cannot start or end with a hyphen`
		)
		.transform(val => val.toLowerCase())
}
