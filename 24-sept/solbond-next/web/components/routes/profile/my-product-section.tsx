import { Product, User } from "@ronin/solbond"
import { get } from "ronin"
import { ProductWrapper, ProductWrapperSkeleton } from "./partials/product-wrapper"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface MyProductsSectionProps {
	user: User
	isAuthorized: boolean
}

export const MyProductsSection: React.FC<MyProductsSectionProps> = async ({ user, isAuthorized }) => {
	const products = await get.products({
		with: { createdBy: user.id }
	})

	if (products.length === 0) {
		return <div className="text-gray-600 dark:text-zinc-400">No products created yet.</div>
	}

	return (
		<div className="space-y-5">
			{products.map(product => (
				<ProductWrapper
					key={product.id}
					image={{
						src: product.coverImage.src,
						name: product.coverImage.name || "Product"
					}}
					slotTop={isAuthorized && <EditBtn product={product} />}
					slotBottom={<CopiesSold />}
					title={product.title}
					subtitle={product.subtitle}
					link={`/${user.username}/${product.productUrl}`}
				/>
			))}
		</div>
	)
}

const EditBtn: React.FC<{ product: Product }> = ({ product }) => {
	return (
		<Link href={`/products/${product.productUrl}/edit`} className="absolute right-4 top-4">
			<Button variant="solbond-secondary" size="solbond">
				Edit
			</Button>
		</Link>
	)
}

const CopiesSold: React.FC = () => {
	return (
		<div className="mt-4 flex dark:text-zinc-300">
			<div className="relative flex items-center gap-x-4">
				<div className="flex">
					<dt>Copies sold:</dt>
					<dd className="font-semibold">&nbsp;0</dd>
				</div>
				<div className="flex">
					<dt>Revenue:</dt>
					<dd className="font-semibold">&nbsp;$0</dd>
				</div>
			</div>
		</div>
	)
}

export const MyProductsSectionSkeleton: React.FC = () => {
	return (
		<div className="space-y-5">
			{[1, 2].map(index => (
				<ProductWrapperSkeleton key={index} />
			))}
		</div>
	)
}
