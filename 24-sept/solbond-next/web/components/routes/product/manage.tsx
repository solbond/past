"use client"

import { frankRuhlLibre } from "@/app/fonts"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { cn, toLowerCaseDash } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// Simplified schema
const productFormSchema = z.object({
	title: z.string().min(1, "Title is required"),
	subtitle: z.string().optional(),
	description: z.string().optional(),
	category: z.string().optional(),
	price: z.number().optional(),
	productUrl: z.string().optional()
})

type ProductFormValues = z.infer<typeof productFormSchema>

const defaultValues: Partial<ProductFormValues> = {
	title: "",
	subtitle: "",
	description: "",
	category: "",
	price: undefined,
	productUrl: ""
}

export default function ProductManage() {
	const router = useRouter()

	const form = useForm<ProductFormValues>({
		resolver: zodResolver(productFormSchema),
		defaultValues,
		mode: "all"
	})

	const onSubmit = async (data: ProductFormValues) => {
		console.log(data)
		// Handle form submission here
	}

	return (
		<div className="mx-auto max-w-7xl px-5 py-8 lg:py-16">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="grid grid-cols-1 gap-y-8 pb-12 lg:grid-cols-3 lg:gap-x-8">
						<div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 md:col-span-2">
							<div className="col-span-full mb-4">
								<div className="flex flex-wrap items-center justify-between sm:flex-nowrap">
									<div>
										<h3 className={cn("text-4xl font-medium tracking-tight lg:text-5xl", frankRuhlLibre.className)}>
											New product
										</h3>
									</div>
									<div className="flex-shrink-0">
										<Button type="button" variant="solbond-secondary" size="solbond">
											Preview
										</Button>
									</div>
								</div>
							</div>

							<div className="col-span-full">
								<FormField
									control={form.control}
									name="title"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="sr-only">Title</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="Title"
													onChange={e => {
														field.onChange(e)
														form.setValue("productUrl", toLowerCaseDash(e.target.value), {
															shouldValidate: true
														})
													}}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className="col-span-full">
								<FormField
									control={form.control}
									name="subtitle"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="sr-only">Short Description</FormLabel>
											<FormControl>
												<Input {...field} placeholder="Short Description" />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>

						<div>
							<div className="sticky left-0 top-20">
								{/* Price section placeholder */}
								<div className="rounded-lg border p-4">
									<h3 className="text-lg font-medium">Price</h3>
									<FormField
										control={form.control}
										name="price"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input {...field} type="number" placeholder="Price" />
												</FormControl>
											</FormItem>
										)}
									/>
								</div>
							</div>
						</div>
					</div>
				</form>
			</Form>
		</div>
	)
}
