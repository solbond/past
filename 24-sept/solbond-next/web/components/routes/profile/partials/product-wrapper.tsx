import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import React, { forwardRef } from "react"

interface ProductWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
	image: {
		src: string
		name: string
		width?: number
		height?: number
		className?: string
	}
	title: string
	subtitle: string
	link?: string
	slotTop?: React.ReactNode
	slotBottom?: React.ReactNode
}

export const ProductWrapper = forwardRef<HTMLDivElement, ProductWrapperProps>(
	({ image, title, subtitle, link, slotTop, slotBottom, className, ...props }, ref) => {
		image.width = image.width || 200
		image.height = image.height || 200

		return (
			<article
				className={cn(
					"relative isolate flex flex-col gap-5 rounded-xl border border-gray-300 lg:flex-row dark:border-0 dark:bg-zinc-900",
					className
				)}
				{...props}
				ref={ref}
			>
				<div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-[3/2] lg:w-36 lg:shrink-0">
					<Image
						src={image.src}
						alt={image.name}
						width={image.width}
						height={image.height}
						priority
						className={cn(
							"absolute inset-0 h-full w-full rounded-t-xl object-cover lg:rounded-l-xl lg:rounded-r-none",
							image.className
						)}
					/>
				</div>
				<div className="flex max-w-xl flex-col px-4 pb-4 lg:py-3 lg:pl-0">
					{slotTop && <>{slotTop}</>}

					<div className="group relative">
						<h3 className="text-base font-semibold text-gray-900 group-hover:text-gray-600 dark:text-zinc-100">
							{link ? (
								<Link href={link}>
									<span className="absolute inset-0"></span>
									{title}
								</Link>
							) : (
								<span>{title}</span>
							)}
						</h3>
						<p className="line-clamp-2 text-sm leading-6 text-gray-600 dark:text-zinc-400">{subtitle}</p>
					</div>

					{slotBottom && <>{slotBottom}</>}
				</div>
			</article>
		)
	}
)

export const ProductWrapperSkeleton: React.FC = () => {
	return (
		<article className="relative isolate flex flex-col gap-5 rounded-xl lg:flex-row dark:bg-zinc-900">
			<div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-[3/2] lg:w-36 lg:shrink-0">
				<Skeleton className="absolute inset-0 h-full w-full rounded-t-xl object-cover lg:rounded-l-xl lg:rounded-r-none dark:bg-zinc-800/90" />
			</div>
			<div className="flex max-w-xl flex-grow flex-col px-4 pb-4 lg:py-3 lg:pl-0">
				<Skeleton className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-xl bg-zinc-200/60 font-semibold shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition hover:bg-zinc-200 dark:bg-zinc-800/90 dark:ring-white/10 hover:dark:bg-zinc-800/90 dark:hover:ring-white/20" />
				<div className="group relative space-y-2">
					<Skeleton className="h-6 w-24 text-lg font-semibold text-gray-900 group-hover:text-gray-600 dark:bg-zinc-800/90 dark:text-zinc-100" />
					<Skeleton className="line-clamp-2 h-6 w-12 text-base text-gray-600 dark:bg-zinc-800/90 dark:text-zinc-400" />
				</div>
			</div>
		</article>
	)
}
