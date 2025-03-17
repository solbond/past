import { User } from "@ronin/solbond"
import { get } from "ronin"
import { LikeButton } from "./partials/like-button"
import { ProductWrapper, ProductWrapperSkeleton } from "./partials/product-wrapper"

interface LikedSectionProps {
	user: User
	isAuthorized: boolean
}

export const LikedSection: React.FC<LikedSectionProps> = async ({ user, isAuthorized }) => {
	const likedProducts = await get.likedProducts({
		with: { user: user.id },
		including: ["product"]
	})

	const products = likedProducts.map(product => product.product)

	if (products.length === 0) {
		return <div className="text-gray-600 dark:text-zinc-400">No products liked yet.</div>
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
					slotTop={isAuthorized && <LikeButton productId={product.id} />}
					title={product.title}
					subtitle={product.subtitle}
				/>
			))}
		</div>
	)
}

export const LikedSectionSkeleton: React.FC = () => {
	return (
		<div className="space-y-5">
			{[1, 2].map(index => (
				<ProductWrapperSkeleton key={index} />
			))}
		</div>
	)
}
