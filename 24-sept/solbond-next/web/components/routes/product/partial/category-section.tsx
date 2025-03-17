import { Category } from "@ronin/solbond"
import { useMemo, useState } from "react"
import { useFormContext } from "react-hook-form"
import { ProductFormValues } from "../manage"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { Combobox, ComboboxInput, ComboboxButton, ComboboxOptions, ComboboxOption } from "@headlessui/react"
import { CheckIcon, ChevronDownIcon } from "lucide-react"

export const CategorySection: React.FC<{ categories: Category[] }> = ({ categories }) => {
	const [query, setQuery] = useState("")
	const form = useFormContext<ProductFormValues>()

	const sortedCategories = useMemo(() => {
		return categories.sort((a, b) => {
			if (a.name.toLowerCase() === "other") return -1
			if (b.name.toLowerCase() === "other") return 1
			return a.name.localeCompare(b.name)
		})
	}, [categories])

	const filteredCategories = query
		? sortedCategories.filter(category => category.name.toLowerCase().startsWith(query.toLowerCase()))
		: sortedCategories

	return (
		<FormField
			control={form.control}
			name="category"
			render={({ field }) => (
				<FormItem>
					<FormLabel className="sr-only">Category</FormLabel>
					<FormControl>
						<Combobox as="div" {...field} immediate onClose={() => setQuery("")}>
							<div className="relative">
								<ComboboxInput
									className={cn(
										"border-input h-11 w-full rounded-lg border px-3 py-1 text-base shadow-sm dark:bg-zinc-950",
										"focus:outline-none data-[focus]:outline-1 data-[focus]:-outline-offset-2 data-[focus]:outline-zinc-400",
										{
											"border-destructive dark:border-destructive placeholder:text-destructive placeholder:opacity-60 data-[focus]:outline-0":
												form.formState.errors.category
										}
									)}
									autoComplete="off"
									placeholder="Category"
									displayValue={(category: string) => {
										return categories.find(c => c.id === category)?.name || ""
									}}
									onChange={event => setQuery(event.target.value)}
								/>
								<ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
									<ChevronDownIcon className="size-6 fill-white/60 group-data-[hover]:fill-white" />
								</ComboboxButton>
							</div>

							<ComboboxOptions
								anchor="bottom"
								transition
								className={cn(
									"border-input w-[var(--input-width)] rounded-xl bg-white p-1 shadow-lg [--anchor-gap:var(--spacing-1)] empty:invisible dark:bg-zinc-800",
									"transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
								)}
							>
								{filteredCategories.map(category => (
									<ComboboxOption
										key={category.id}
										value={category.id}
										className="group flex cursor-default select-none items-center gap-2 rounded-lg px-3 py-2.5 data-[focus]:bg-zinc-100 dark:data-[focus]:bg-zinc-700"
									>
										<CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
										<div className="text-base">{category.name}</div>
									</ComboboxOption>
								))}
							</ComboboxOptions>
						</Combobox>
					</FormControl>

					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
