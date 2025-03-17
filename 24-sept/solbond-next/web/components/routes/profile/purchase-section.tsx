import { User } from "@ronin/solbond"
import { FileIcon } from "lucide-react"
import { get } from "ronin"
import { ProductWrapper, ProductWrapperSkeleton } from "./partials/product-wrapper"
import { readableFileSize } from "@/lib/utils"
import { DownloadAllButton, DownloadFileButton } from "./partials/download-file-button"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"

interface PurchasedSectionProps {
	user: User
}

export const PurchasedSection: React.FC<PurchasedSectionProps> = async ({ user }) => {
	const purchasedProducts = await get.purchasedProducts({
		with: { user: user.id },
		including: ["product"]
	})

	const files = await get.files({
		with: { product: purchasedProducts.map(product => product.product.id) }
	})

	// associate files with products
	const products = purchasedProducts.map(product => {
		const productFiles = files.filter(file => file.product === product.product.id)
		return {
			...product.product,
			files: productFiles
		}
	})

	if (products.length === 0) {
		return <div className="text-gray-600 dark:text-zinc-400">No products purchased yet.</div>
	}

	return (
		<div className="space-y-5">
			{products.map(product => (
				<div key={product.id} className="rounded-xl border border-gray-300 dark:border-0 dark:bg-zinc-900">
					<ProductWrapper
						image={{
							src: product.coverImage.src,
							name: product.coverImage.name || "Product",
							className: "!rounded-bl-none"
						}}
						title={product.title}
						subtitle={product.subtitle}
						className="border-0"
					/>
					<div className="border-t border-gray-300">
						<ul role="list" className="divide-y divide-gray-200 dark:divide-zinc-800 dark:bg-zinc-950">
							{product.files.map((file, index) => (
								<li key={index} className="flex items-center justify-between gap-x-5 p-4">
									<div className="flex min-w-0 gap-x-4">
										{file.content?.meta?.type?.startsWith("image") ? (
											<Image
												src={file.content.src}
												alt={file.name}
												width={64}
												height={64}
												className="h-16 w-16 flex-none rounded-lg object-cover"
												priority
											/>
										) : (
											<FileIcon size={24} />
										)}

										<div className="min-w-0 flex-auto">
											<p className="text-base font-semibold dark:text-zinc-100">{file.name}</p>
											<p className="truncate text-sm text-gray-500 dark:text-zinc-400">
												{file.content?.meta ? readableFileSize(file.content.meta.size) : "Unknown size"}
											</p>
										</div>
									</div>
									<DownloadFileButton file={file} />
								</li>
							))}
						</ul>
					</div>
					<div className="flex border-t border-gray-300 p-4">
						<DownloadAllButton files={product.files} />
					</div>
				</div>
			))}
		</div>
	)
}

export const PurchasedSectionSkeleton: React.FC = () => {
	return (
		<div className="space-y-5">
			{[1, 2].map(index => (
				<div key={index} className="rounded-xl border border-gray-300 dark:border-0 dark:bg-zinc-900">
					<ProductWrapperSkeleton />
					<div className="border-t border-gray-300">
						<ul role="list" className="divide-y divide-gray-200 dark:divide-zinc-800 dark:bg-zinc-950">
							{[1, 2].map(index => (
								<li key={index} className="flex items-center justify-between gap-x-5 p-4">
									<div className="flex min-w-0 gap-x-4">
										<Skeleton className="h-16 w-16 flex-none rounded-lg object-cover dark:bg-zinc-800/90" />
										<div className="min-w-0 flex-auto space-y-2">
											<Skeleton className="h-4 min-w-14 text-base font-semibold text-gray-900 dark:bg-zinc-800/90" />
											<Skeleton className="h-4 min-w-12 truncate text-sm text-gray-500 dark:bg-zinc-800/90" />
										</div>
									</div>
									<Skeleton className="flex items-center justify-center rounded-full bg-zinc-200/60 font-semibold shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition hover:cursor-pointer hover:bg-zinc-200 dark:bg-zinc-800/90 dark:ring-white/10 hover:dark:bg-zinc-800/90 dark:hover:ring-white/20" />
								</li>
							))}
						</ul>
					</div>
					<div className="flex border-t border-gray-300 p-4">
						<Skeleton className="ml-auto rounded-full bg-zinc-200/60 px-4 py-2 font-semibold shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition hover:cursor-pointer hover:bg-zinc-200 dark:bg-zinc-800/90 dark:ring-white/10 hover:dark:bg-zinc-800/90 dark:hover:ring-white/20" />
					</div>
				</div>
			))}
		</div>
	)
}
