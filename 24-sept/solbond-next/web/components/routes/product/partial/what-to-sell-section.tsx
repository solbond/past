import { useFormContext } from "react-hook-form"
import { ProductFormValues } from "../manage"
import { useEffect, useState } from "react"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn, readableFileSize } from "@/lib/utils"
import { CheckIcon, FileIcon, Trash2Icon, XIcon } from "lucide-react"
import { FileError, FileRejection, useDropzone } from "react-dropzone"
import { File as RoninFile } from "@ronin/solbond"
import { deleteFile, storeFile } from "@/app/actions/file"

interface FileWithProgress {
	fileName: string
	fileSize: number
	fileType: string
	status: "pending" | "uploading" | "uploaded" | "failed"
}

const MAX_FILES = 5
const MAX_SIZE = 250 * 1024 * 1024

export const WhatToSellSection: React.FC<{ productFiles?: RoninFile[] }> = ({ productFiles }) => {
	const form = useFormContext<ProductFormValues>()

	const [files, setFiles] = useState<FileWithProgress[]>([])
	const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([])

	/**
	 * * When mounted, set the files to the product files
	 */
	useEffect(() => {
		if (productFiles) {
			setFiles(
				productFiles.map(file => ({
					fileName: file.name,
					fileSize: file.size,
					fileType: file.type,
					status: "uploaded"
				}))
			)
			form.setValue(
				"fileIds",
				productFiles.map(file => ({ fileName: file.name, roninId: file.id }))
			)
		}
	}, [productFiles])

	const uploadFile = async (file: File) => {
		const formData = new FormData()
		formData.append("file", file)

		setFiles(prevFiles => prevFiles.map(f => (f.fileName === file.name ? { ...f, status: "uploading" } : f)))

		const [data, error] = await storeFile(formData)

		if (error) {
			setFiles(prevFiles => prevFiles.map(f => (f.fileName === file.name ? { ...f, status: "failed" } : f)))
			return
		}

		const uploadedFile = data.fileModel

		form.setValue("fileIds", [
			...form.getValues("fileIds"),
			{ fileName: uploadedFile?.name, roninId: uploadedFile?.id }
		])

		setFiles(prevFiles => prevFiles.map(f => (f.fileName === file.name ? { ...f, status: "uploaded" } : f)))
	}

	const onDrop = (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
		const validFiles = Array.from(acceptedFiles).map(file => ({
			fileName: file.name,
			fileSize: file.size,
			fileType: file.type,
			status: "pending" as const
		}))
		setFiles(prevFiles => [...prevFiles, ...validFiles])

		setRejectedFiles(prev => [...prev, ...rejectedFiles])

		acceptedFiles.forEach(file => {
			uploadFile(file)
		})
	}

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		maxSize: MAX_SIZE,
		maxFiles: MAX_FILES
	})

	const removeFile = async (fileName: string) => {
		const fileId = form.getValues("fileIds").find(f => f.fileName === fileName)?.roninId
		setFiles(prev => prev.filter(f => f.fileName !== fileName))
		form.setValue(
			"fileIds",
			form.getValues("fileIds").filter(f => f.fileName !== fileName)
		)

		if (!fileId) return

		await deleteFile({ id: fileId })
	}

	return (
		<div className="space-y-3">
			<h2 className="text-base font-semibold">Choose what to sell</h2>
			<FormField
				control={form.control}
				name="fileIds"
				render={() => (
					<FormItem>
						<FormLabel className="sr-only">Files</FormLabel>
						<FormControl>
							<div
								{...getRootProps()}
								className={cn("border-input group rounded-lg border focus:border-zinc-400 focus:outline-none", {
									"border-destructive focus:border-destructive": form.formState.errors?.fileIds
								})}
							>
								<div className="divide-input divide-y dark:divide-zinc-600">
									{/* Accepted files */}
									{files.map(({ fileName, fileSize, status }) => (
										<FileItemPreview
											key={fileName}
											fileName={fileName}
											size={fileSize}
											status={status}
											onClick={e => {
												e.stopPropagation()
												removeFile(fileName)
											}}
										/>
									))}

									{/* Rejected files */}
									{rejectedFiles.map(({ file, errors }) => (
										<FileItemRejectionPreview
											key={file.name}
											fileName={file.name}
											errors={errors}
											onClick={e => {
												e.stopPropagation()
												setRejectedFiles(prev => prev.filter(f => f.file.name !== file.name))
											}}
										/>
									))}
								</div>

								<div className="border-input flex h-64 items-center justify-center border-t focus:outline-none">
									<div className="text-center">
										<FileIcon className="mx-auto h-10 w-10 text-gray-300" />

										<div className="mt-4 space-y-2">
											<label
												className={cn(
													buttonVariants({ variant: "solbond-secondary" }),
													"group-focus-visible:ring-ring group-focus-visible:outline-none group-focus-visible:ring-1"
												)}
											>
												<input {...getInputProps()} />
												{isDragActive ? <span>Drop the files here ...</span> : <span>Choose files</span>}
											</label>

											<p className="text-sm font-medium text-zinc-500">or drop files here</p>
										</div>
									</div>
								</div>
							</div>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	)
}

const FileItemPreview: React.FC<{
	fileName: string
	size: number
	status: "pending" | "uploading" | "uploaded" | "failed"
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}> = ({ fileName, size, status, onClick }) => {
	return (
		<div className="flex items-center justify-between gap-x-6 px-4 py-3">
			<div className="w-2/3">
				<p
					className={cn("truncate text-base font-semibold text-zinc-900 dark:text-zinc-100", {
						"text-destructive": status === "failed"
					})}
				>
					{fileName}
				</p>
				<div className="mt-1 flex items-center gap-x-2 text-sm leading-5 text-zinc-500 dark:text-zinc-400">
					{status === "failed" && <p className="whitespace-nowrap text-orange-600">Failed to upload</p>}
					{status !== "failed" && <p className="whitespace-nowrap">{readableFileSize(size)}</p>}
				</div>
			</div>
			<div className="flex grow items-center justify-end space-x-2 pr-0.5 md:space-x-4">
				{status === "uploaded" && <CheckIcon className="size-6 text-green-500" />}
				{status === "failed" && <XIcon className="size-6 text-orange-600" />}
				{status === "uploading" && <div className="loader"></div>}

				<Button
					type="button"
					variant="solbond-secondary"
					className="h-11 w-11 min-w-11 bg-orange-600/10 p-0 text-orange-600 shadow-none hover:bg-orange-600/20 hover:text-orange-600 dark:bg-orange-600/10 dark:hover:bg-orange-600/20 dark:hover:text-orange-600"
					onClick={onClick}
					disabled={status === "uploading"}
				>
					<Trash2Icon size={20} />
				</Button>
			</div>
		</div>
	)
}

const FileItemRejectionPreview: React.FC<{
	fileName: string
	errors: FileError[]
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}> = ({ fileName, errors, onClick }) => {
	return (
		<div className="flex items-center justify-between gap-x-6 px-4 py-3">
			<div className="w-2/3">
				<p className={cn("text-destructive truncate text-base font-semibold dark:text-zinc-100")}>{fileName}</p>
				<div className="mt-1 flex items-center gap-x-2 text-sm leading-5 text-zinc-500 dark:text-zinc-400">
					{errors.map((error, index) => (
						<p key={index} className="whitespace-nowrap text-orange-600">
							{error.message}
						</p>
					))}
				</div>
			</div>
			<div className="flex grow items-center justify-end space-x-2 pr-0.5 md:space-x-4">
				<Button
					type="button"
					variant="solbond-secondary"
					className="hover:bg-orange-6000/20 dark:hover:text-orange-6000 h-11 w-11 min-w-11 bg-orange-600/10 p-0 text-orange-600 shadow-none hover:text-orange-600 dark:bg-orange-600/10 dark:hover:bg-orange-600/20"
					onClick={onClick}
				>
					<Trash2Icon size={20} />
				</Button>
			</div>
		</div>
	)
}
