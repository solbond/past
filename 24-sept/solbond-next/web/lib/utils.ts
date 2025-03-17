import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import toast from "react-hot-toast"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const handleAttachmentClick = (event: React.MouseEvent<HTMLDivElement>) => {
	event.stopPropagation()
}

export const randomId = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

export const errorToast = (msg: string) => toast(`⚠️ ${msg}`)

export const bytesToMB = (bytes: number) => bytes / (1024 * 1024)

export const blobToFile = (blob: Blob, fileName: string, mimeType?: string): File => {
	const file = new File([blob], fileName, {
		type: mimeType || blob.type
	})
	return file
}

export const urlToFile = async (url: string, fileName: string, mimeType?: string): Promise<File> => {
	const blob = await fetch(url).then(r => r.blob())
	return blobToFile(blob, fileName, mimeType)
}

export function toLowerCaseDash(str: string) {
	return str
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, "") // Remove non-word chars (except spaces and dashes)
		.replace(/[\s_-]+/g, "-") // Replace spaces, underscores, and dashes with a single dash
		.replace(/^-+|-+$/g, "") // Remove leading and trailing dashes
}

export function getFileSizeFromUrl(url: string): Promise<number> {
	return fetch(url, { method: "HEAD" }).then(response => {
		const contentLength = response.headers.get("Content-Length")
		if (contentLength) {
			const sizeInBytes = parseInt(contentLength, 10)
			return bytesToMB(sizeInBytes)
		} else {
			throw new Error("Content-Length header is not available")
		}
	})
}

export const readableFileSize = (size: number) => {
	if (size === 0) return "0 Bytes"
	const i = Math.floor(Math.log(size) / Math.log(1024))
	return `${(size / Math.pow(1024, i)).toFixed(2)} ${["Bytes", "KB", "MB", "GB", "TB"][i]}`
}

export const urlWithoutSchemaQuery = (url: string) => {
	return url.replace(/^(https?:\/\/)/, "").replace(/(\?[^#]*)(\#.*)?$/, "$1")
}

export function currencyFormat(amount: number, currency: string = "usd") {
	let numberFormat = new Intl.NumberFormat(["en-US"], {
		style: "currency",
		currency: currency,
		currencyDisplay: "symbol",
		maximumFractionDigits: 2
	})

	let number = numberFormat.format(amount)

	// remove .00
	number = number.replace(/\.00$/, "")
	return number
}

export function formatAmountForStripe(amount: number, currency: string) {
	let numberFormat = new Intl.NumberFormat(["en-US"], {
		style: "currency",
		currency: currency,
		currencyDisplay: "symbol"
	})
	const parts = numberFormat.formatToParts(amount)
	let zeroDecimalCurrency: boolean = true
	for (let part of parts) {
		if (part.type === "decimal") {
			zeroDecimalCurrency = false
		}
	}
	return zeroDecimalCurrency ? amount : Math.round(amount * 100)
}
