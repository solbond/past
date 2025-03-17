import Image from "next/image"
import { cn, currencyFormat } from "@/lib/utils"
import { frankRuhlLibre } from "@/app/fonts"

// Mock data for development
const mockProduct = {
	id: "1",
	title: "Example Product",
	subtitle: "This is a sample product description",
	description: "<p>This is the full product description with HTML content.</p>",
	price: 99.99,
	coverImage: {
		src: "/placeholder.jpg",
		name: "Product Image"
	},
	createdBy: {
		username: "demo_user",
		prettyName: "Demo User",
		profileImage: {
			src: "/avatar-placeholder.jpg"
		}
	}
}

export default async function ProductPage({ params }: { params: { username: string; product: string } }) {
	// Using mock data for now
	const product = mockProduct
	const isMyProduct = false
	const isLiked = false

	const markup = { __html: product.description }

	if (isMyProduct) {
		return (
			<div className="px-4 sm:px-6 md:px-8">
				<div className="mx-auto max-w-3xl">
					<ProductHeader product={product} isLiked={isLiked} />
					<div className="prose dark:prose-dark" dangerouslySetInnerHTML={markup}></div>
				</div>
			</div>
		)
	}

	return (
		<div className="mx-auto max-w-2xl px-5 py-8 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:py-16 lg:pb-24 lg:pt-16">
			<div className="lg:col-span-2">
				<ProductHeader product={product} isLiked={isLiked} />
			</div>

			<div className="mt-4 lg:row-span-3 lg:mt-0">
				<div className="flex-center flex-col items-center gap-4 rounded-xl border bg-white bg-gradient-to-b from-[rgba(56,186,69,0.04)] px-5 py-9 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
					<div className="relative flex items-center justify-center gap-x-2">
						<h2 className={cn("text-5xl font-bold tracking-tight lg:text-7xl", frankRuhlLibre.className)}>
							{currencyFormat(product.price)}
						</h2>
						<Image src="/images/coin.png" alt="coin" width={40} height={40} />
					</div>

					<button className="w-full rounded-full bg-black px-8 py-4 text-white hover:opacity-90 dark:bg-white dark:text-black">
						Buy Now
					</button>
				</div>
			</div>

			<div className="py-10 lg:col-span-2 lg:col-start-1 lg:pb-16 lg:pt-6">
				<div className="prose-lg dark:prose-dark" dangerouslySetInnerHTML={markup}></div>
			</div>
		</div>
	)
}

const ProductHeader = ({ product, isLiked }: { product: typeof mockProduct; isLiked: boolean }) => {
	return (
		<div>
			<div className="relative flex items-center justify-between gap-x-6 py-5">
				<div className="min-w-0">
					<h1
						className={cn(
							"text-2xl font-extrabold tracking-tight text-slate-900 md:text-4xl dark:text-slate-200",
							frankRuhlLibre.className
						)}
					>
						{product.title}
					</h1>
					<p className="mt-2 text-lg dark:text-zinc-400">{product.subtitle}</p>
				</div>
				<div className="flex flex-none items-center gap-x-4">
					<button className="rounded-full bg-gray-100 p-2 hover:bg-gray-200">❤️</button>
				</div>
			</div>
			<div className="flex items-center gap-x-3">
				<span className="font-medium">Course by </span>
				<Image
					src={product.createdBy.profileImage.src}
					alt={product.createdBy.prettyName}
					width={32}
					height={32}
					className="size-8 flex-none rounded-full"
				/>
				<h3 className="flex-auto truncate text-base font-semibold">{product.createdBy.prettyName}</h3>
			</div>

			<div className="relative my-6 overflow-hidden rounded-2xl">
				<Image src={product.coverImage.src} alt={product.coverImage.name} width={1200} height={600} />
				<div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-slate-900/10 dark:ring-white/10"></div>
			</div>
		</div>
	)
}
