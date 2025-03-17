import { useFormContext } from "react-hook-form"
import { ProductFormValues } from "../manage"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { ImageIcon } from "lucide-react"
import { useDropzone } from "react-dropzone"
import { useMemo } from "react"

const MAX_SIZE = 1024 * 1024 * 5
const MAX_FILES = 1

export const CoverImageSection: React.FC = () => {
	/*
	 * Get form context
	 */
	const form = useFormContext<ProductFormValues>()

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		maxSize: MAX_SIZE,
		maxFiles: MAX_FILES,
		accept: {
			"image/*": []
		},
		onDrop: acceptedFiles => {
			form.setValue("coverImage", acceptedFiles[0], {
				shouldValidate: true
			})
		}
	})
	// memoized
	const coverImage = useMemo(() => {
		const file = form.watch("coverImage")
		return file ? URL.createObjectURL(file) : ""
	}, [form.watch("coverImage")])

	return (
		<FormField
			control={form.control}
			name="coverImage"
			render={() => (
				<FormItem>
					<FormLabel className="sr-only">Cover Image</FormLabel>
					<FormControl>
						<div
							{...getRootProps()}
							className={cn(
								"border-input group relative flex h-64 items-center justify-center rounded-lg border px-5 focus:border-zinc-400 focus:outline-none",
								{
									"border-destructive focus:border-destructive": form.formState.errors.coverImage
								}
							)}
						>
							{coverImage && (
								<Image
									className="relative rounded-lg object-contain"
									width={0}
									height={0}
									sizes="100vw"
									style={{ height: "100%", width: "100%" }}
									src={coverImage}
									onLoad={() => {
										URL.revokeObjectURL(coverImage)
									}}
									alt="Cover Image"
								/>
							)}

							<div className="text-center">
								{!form.getValues("coverImage") && <ImageIcon className="mx-auto h-10 w-10 text-gray-300" />}

								<div className="mt-4 space-y-2">
									<label
										className={cn(
											buttonVariants({ variant: "solbond-secondary" }),
											"group-focus-visible:ring-ring group-focus-visible:outline-none group-focus-visible:ring-1",
											{ "absolute bottom-5 right-5": form.getValues("coverImage") }
										)}
									>
										<input {...getInputProps()} />
										{isDragActive ? (
											<span>Drop the image here ...</span>
										) : (
											<>
												{form.getValues("coverImage") ? (
													<span>Change cover image</span>
												) : (
													<span>Upload cover image</span>
												)}
											</>
										)}
									</label>

									{!form.getValues("coverImage") && (
										<p className="text-sm font-medium text-zinc-500">or drop image here</p>
									)}
								</div>
							</div>
						</div>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
