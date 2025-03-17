import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import { HomeRoute } from "@/components/routes/HomeRoute"
import { Product } from "@ronin/solbond"
import { get } from "ronin"

export default async function Home() {
	const products = (await get.products.with({
		featured: true
	})) as Product[]

	return (
		<>
			<Header />
			<main className="flex-grow">
				<HomeRoute products={products} />
			</main>
			<Footer />
		</>
	)
}
