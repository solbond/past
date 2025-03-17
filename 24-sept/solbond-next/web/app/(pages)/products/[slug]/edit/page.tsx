import { getCurrentRoninUser } from "@/app/actions"
import ProductManage from "@/components/routes/product/manage"
import { ProductWithFiles } from "@/types/common"
import { notFound } from "next/navigation"
import { get } from "ronin"

export default async function EditProductPage({ params }: { params: { slug: string } }) {
	const auth = await getCurrentRoninUser()

	if (!auth) {
		notFound()
	}

	const product = await get.product.with.productUrl(params.slug)

	// Authorization, if the product is not found or the product is not created by the current user, redirect to 404
	if (!product || product.createdBy !== auth.id) {
		notFound()
	}

	const productFiles = await get.files({
		with: { product: product.id }
	})

	const productWithFiles: ProductWithFiles = {
		...product,
		files: productFiles
	}

	const categories = await get.categories()

	return <ProductManage categories={categories} user={auth} productWithFiles={productWithFiles} />
}
