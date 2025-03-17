import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { useFormContext } from "react-hook-form"
import { ProductFormValues } from "../manage"
import { NumericFormat } from "react-number-format"
import { frankRuhlLibre } from "@/app/fonts"
import { FancySwitch } from "@/components/fancy-switch"

export const PriceSellSection: React.FC<{
	isEdit: boolean
}> = ({ isEdit }) => {
	const form = useFormContext<ProductFormValues>()

	/*
	 * Check if the form is ready to submit
	 */
	const canSubmit = form.formState.isDirty && form.formState.isValid && !form.formState.isSubmitting

	return (
		<>
			<div
				className={cn(
					"border-input flex flex-col items-center justify-center space-y-6 rounded-2xl border px-5 py-10",
					{ "border-destructive dark:border-destructive border": form.formState.errors.price }
				)}
			>
				<FormField
					control={form.control}
					name="price"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="sr-only">Price</FormLabel>
							<FormControl>
								<NumericFormat
									value={field.value}
									onValueChange={values => {
										// values.floatValue sometimes fallback to default value. and we don't want that.
										field.onChange(values.floatValue ?? undefined, {
											shouldValidate: true
										})
									}}
									placeholder="$0"
									prefix="$"
									allowLeadingZeros
									decimalScale={2}
									thousandSeparator
									maxLength={6}
									className={cn(
										"flex h-24 w-full border-none bg-transparent text-center text-8xl font-bold tracking-tight outline-none placeholder:text-zinc-400/60",
										frankRuhlLibre.className
									)}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="isPublished"
					render={({ field }) => (
						<FormItem className="flex items-center">
							<FormLabel className="sr-only">Is Published</FormLabel>
							<FormControl>
								<FancySwitch
									{...field}
									options={[
										{ label: "Publish", value: 1 },
										{ label: "Unlisted", value: 0 }
									]}
									className="flex rounded-full bg-zinc-200/60 p-1.5 dark:bg-zinc-800/90"
									highlighterClassName="bg-white dark:bg-zinc-950 rounded-full"
									radioClassName={cn(
										"relative flex h-10 cursor-pointer items-center justify-center rounded-full px-5 text-base font-semibold shadow-sm transition-colors focus:outline-none data-[checked]:text-zinc-900 dark:text-zinc-400 dark:data-[checked]:text-zinc-100"
									)}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<button
					className={cn(
						"text-md h-16 w-full rounded-full bg-gradient-to-r from-pink-200 via-blue-200 to-pink-200 bg-[length:400%_300%] py-4 font-semibold text-neutral-800 shadow-md transition-all",
						canSubmit ? "hover:animate-gradient-x" : "cursor-not-allowed opacity-60"
					)}
					style={{
						backgroundSize: "200% 200%",
						backgroundPosition: "0% 0%"
					}}
					type="submit"
					onMouseEnter={() => {
						if (!canSubmit) form.trigger()
					}}
				>
					{form.formState.isSubmitting ? "Submitting..." : isEdit ? "Update product" : "Publish and start selling"}
				</button>
			</div>

			{form.formState.errors.price?.message && (
				<p className={cn("text-destructive mt-2 text-[0.8rem] font-medium")}>
					{form.formState.errors.price.message.toString()}
				</p>
			)}
		</>
	)
}
