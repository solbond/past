"use client"

import { Button } from "@/components/ui/button"
import { File } from "@ronin/solbond"
import { CloudDownloadIcon } from "lucide-react"
import toast from "react-hot-toast"

export const DownloadFileButton: React.FC<{ file: File }> = ({ file }) => {
	const handleClick = () => {
		const url = file.content?.src

		if (!url) {
			toast.error("File not found")
			return
		}

		window.open(url, "_blank")
	}

	return (
		<Button
			variant="solbond-secondary"
			size="solbond"
			onClick={handleClick}
			className="flex size-10 items-center justify-center p-0"
		>
			<CloudDownloadIcon size={20} />
		</Button>
	)
}

export const DownloadAllButton: React.FC<{ files: File[] }> = ({ files }) => {
	const handleClick = () => {
		files.forEach(file => {
			const url = file.content?.src

			if (!url) {
				toast.error("File not found")
				return
			}

			window.open(url, "_blank")
		})
	}

	return (
		<Button variant="solbond-secondary" size="solbond" className="ml-auto" onClick={handleClick}>
			Download all
		</Button>
	)
}
