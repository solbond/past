import { getCurrentRoninUser } from "@/app/actions"
import ProductManage from "@/components/routes/product/manage"
import { redirect } from "next/navigation"
import { get } from "ronin"

export default async function NewProductPage() {
	const auth = await getCurrentRoninUser()

	if (!auth) {
		redirect("/sign-in")
	}

	const categories = await get.categories()
	return <ProductManage categories={categories} user={auth} />
}
