"use client"

import { Input } from "@/components/ui/input"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm, useFormContext } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { createAvatarValidationSchema, profileSchema } from "@/lib/common-schema"
import { cn, urlToFile, urlWithoutSchemaQuery } from "@/lib/utils"
import { User } from "@ronin/solbond"
import { useEffect } from "react"
import Icon from "../Icons"
import { useDebounce } from "use-debounce"
import { checkUsername, updateProfileAction } from "@/app/actions"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

export type ProfileFormValues = z.infer<typeof profileSchema>

const defaultValues: ProfileFormValues = {
	prettyName: "",
	username: "",
	profileImage: undefined,
	wallet: ""
}

type ProfileSetupProps = {
	user: User
}

const ProfileSetup: React.FC<ProfileSetupProps> = ({ user }) => {
	const router = useRouter()

	/*
	 * Initialize form
	 */
	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(profileSchema),
		defaultValues: defaultValues,
		mode: "all"
	})

	/*
	 * Check if the form is ready to submit
	 */
	const canSubmit = form.formState.isDirty && form.formState.isValid && !form.formState.isSubmitting

	/*
	 * When mounted, set the form values to the user's data
	 */
	useEffect(() => {
		const setProfileImage = async (image: string) => {
			const file = await urlToFile(image, "profile-image")
			form.setValue("profileImage", file, { shouldDirty: false })
		}

		form.setValue("prettyName", user.prettyName || "", { shouldDirty: false })
		form.setValue("username", user.username || "", { shouldDirty: false })
		user.profileImage?.src && setProfileImage(user.profileImage.src)
	}, [user])

	/*
	 * Handle form submission
	 */
	const onSubmit = async (values: ProfileFormValues) => {
		const [res] = await checkUsername({ username: values.username })

		if (res?.exists) {
			form.setError(
				"username",
				{
					type: "manual",
					message: "Username is already taken"
				},
				{ shouldFocus: true }
			)
			return // Prevent form submission
		}

		const formData = new FormData()

		Object.entries(values).forEach(([key, value]) => {
			switch (key) {
				case "profileImage":
					if (value instanceof File) {
						formData.append(key, value)
					}
					break
				case "wallet":
					// Do nothing
					break
				default:
					formData.append(key, value)
					break
			}
		})

		const [_, err] = await updateProfileAction(formData)

		if (err) {
			toast.error("Failed to update profile", { duration: 3000 })
			return
		}

		toast.success("Profile updated successfully", { duration: 3000 })
		router.push(`/${values.username}`)
	}

	return (
		<div className="mx-auto grid max-w-6xl grid-cols-1 px-4 py-10 sm:px-6 md:grid-cols-2 lg:px-8">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 md:col-span-1">
					<section>
						<div className="grid grid-cols-1">
							<ProfileImageSection />
						</div>
					</section>

					<section className="space-y-4">
						<h2 className="text-base font-semibold">Your page</h2>

						<ProfileYourPageSection />
					</section>

					<section className="space-y-4">
						<h2 className="text-base font-semibold">Wallet</h2>

						<FormField
							control={form.control}
							name="wallet"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="sr-only">Wallet</FormLabel>
									<FormControl>
										<div className="flex gap-x-3">
											<Input
												{...field}
												placeholder="Solana wallet number"
												className={cn("h-11 rounded-lg text-base shadow-sm")}
											/>
											<Button
												type="button"
												className="inline-flex h-11 min-w-20 rounded-full bg-zinc-200/60 text-base text-gray-900 shadow-none hover:bg-zinc-200"
											>
												Check
											</Button>
										</div>
									</FormControl>
									<FormDescription className="text-zinc-400">Will be used for payouts</FormDescription>
								</FormItem>
							)}
						/>
					</section>

					<div className="mt-8 flex">
						<Button
							type="submit"
							className={cn(
								"h-12 rounded-full bg-gradient-to-r from-pink-200 via-blue-200 to-pink-200 bg-[length:400%_300%] px-6 text-base font-semibold text-neutral-800 shadow-md transition-all",
								canSubmit ? "hover:animate-gradient-x" : "cursor-not-allowed opacity-50"
							)}
							onMouseEnter={() => {
								if (!canSubmit) form.trigger()
							}}
							disabled={form.formState.isSubmitting}
						>
							{form.formState.isSubmitting ? "Updating..." : "Save and continue"}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	)
}

export const ProfileImageSection: React.FC = () => {
	const form = useFormContext()

	/*
	 * Handle profile image change
	 */
	const handleProfileImageChange = async (file: File) => {
		try {
			const fileRes = await createAvatarValidationSchema(true).parseAsync(file)
			form.setValue("profileImage", fileRes)
		} catch (error) {
			if (error instanceof z.ZodError) {
				const [message] = error.errors.map(e => e.message)
				form.setError("profileImage", { message })
			}
		}
	}

	return (
		<FormField
			control={form.control}
			name="profileImage"
			render={() => (
				<FormItem className="flex flex-col">
					<FormLabel className="sr-only">Your name</FormLabel>
					<FormControl>
						<div
							className={cn(
								"relative !mt-0 flex size-28 items-center justify-center overflow-hidden rounded-full bg-zinc-200/60",
								{
									"border-destructive border": form.formState.errors.profileImage
								}
							)}
						>
							{form.getValues("profileImage") instanceof File ? (
								<Image
									className="relative size-28 flex-none rounded-full object-cover"
									width={112}
									height={112}
									src={URL.createObjectURL(form.getValues("profileImage") as File)}
									alt="Profile image"
								/>
							) : (
								<Icon name="Camera" />
							)}

							<label
								htmlFor="profileImage"
								className="absolute inset-0 flex h-full w-full items-center bg-black bg-opacity-75 text-sm font-medium text-white opacity-0 focus-within:opacity-100 hover:opacity-100"
							>
								<span>Change</span>
								<span className="sr-only">user photo</span>
								<Input
									type="file"
									id="profileImage"
									accept="image/*"
									className="absolute inset-0 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"
									onChange={e => e.target.files && handleProfileImageChange(e.target.files[0])}
								/>
							</label>
						</div>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

export const ProfileYourPageSection: React.FC = () => {
	const form = useFormContext()

	const username = form.watch("username")
	const [debouncedUsername] = useDebounce(username, 500)

	/*
	 * Check if the username is available
	 */
	useEffect(() => {
		const checkUsernameAvailability = async () => {
			if (debouncedUsername) {
				const isValid = await form.trigger("username")

				if (isValid) {
					try {
						const [res] = await checkUsername({ username: debouncedUsername })

						if (res?.exists) {
							form.setError("username", {
								type: "manual",
								message: "Username is already taken"
							})
						} else {
							form.clearErrors("username")
						}
					} catch (error) {
						form.setError("username", {
							type: "manual",
							message: "Error checking username availability"
						})
					} finally {
					}
				}
			}
		}

		checkUsernameAvailability()
	}, [debouncedUsername])

	return (
		<>
			<FormField
				control={form.control}
				name="prettyName"
				render={({ field }) => (
					<FormItem>
						<FormLabel className="sr-only">Your name</FormLabel>
						<FormControl>
							<Input
								{...field}
								placeholder="Your name"
								error={
									typeof form.formState.errors.prettyName?.message === "string"
										? form.formState.errors.prettyName.message
										: undefined
								}
								className="bg-white dark:bg-zinc-950"
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name="username"
				render={({ field }) => (
					<FormItem>
						<FormLabel className="sr-only">Username</FormLabel>
						<FormControl>
							<Input
								{...field}
								placeholder="Username"
								error={
									typeof form.formState.errors.username?.message === "string"
										? form.formState.errors.username.message
										: undefined
								}
								className="bg-white dark:bg-zinc-950"
							/>
						</FormControl>
						<FormMessage />
						<FormDescription className="text-zinc-500">
							{urlWithoutSchemaQuery(process.env.NEXT_PUBLIC_APP_URL || "")}/
							<span className="font-semibold">{field.value || "username"}</span>
						</FormDescription>
					</FormItem>
				)}
			/>
		</>
	)
}

export { ProfileSetup }
