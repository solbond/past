import { ProductSchema } from "@ronin/solbond"
import { create, get } from "ronin"
import { faker } from "@faker-js/faker"

async function randomProduct(): Promise<Partial<ProductSchema>> {
	return {
		title: faker.commerce.productName(),
		subtitle: faker.commerce.productAdjective(),
		description: faker.commerce.productDescription(),
		price: parseFloat(faker.commerce.price()),
		currency: "usd",
		productUrl: faker.lorem.slug(),
		isPublished: faker.datatype.boolean(),
		featured: faker.datatype.boolean()
	}
}

const products = await Promise.all(Array.from({ length: 10 }, randomProduct))

async function main() {
	await seed()
}

async function seed() {
	await categorySeeder()
	await productSeeder()
}

async function categorySeeder() {
	console.log("")
	console.info("Start seeding categories")
	console.log("=========================")

	const categories = [
		"Courses",
		"Books",
		"Software",
		"Design",
		"Subscriptions & Services",
		"3D Models & Animations",
		"Templates & Themes",
		"Other"
	]

	for (const category of categories) {
		const isExisting = await get.category.with({
			name: category
		})

		if (isExisting) {
			console.log(`Category ${category} already exists`)
			continue
		}

		console.log(`Seeding category: ${category}`)

		await create.category.with({
			name: category
		})
	}

	console.info("Done seeding categories")
}

async function productSeeder() {
	console.log("")
	console.info("Start seeding products")
	console.log("======================")

	const users = await get.users()
	const categories = await get.categories()

	if (users.length === 0) {
		console.error("No users found")
		return
	}

	for (const product of products) {
		try {
			const user = faker.helpers.arrayElement(users)
			const category = faker.helpers.arrayElement(categories)

			console.info(`Seeding products "${product.title}" for user: ${user.prettyName ?? user.id}`)

			// fetch random image from loremflickr.com
			const url = faker.image.url()
			const response = await fetch(url)

			if (!response.ok) {
				throw new Error(`Failed to fetch image: ${response.statusText}`)
			}

			const coverImage = await response.blob()
			const productData = {
				...product,
				coverImage: coverImage,
				createdBy: user.id,
				category: category.id,
				spherePayCheckoutLink: product.spherePayCheckoutLink?.toString()
			}

			const productModel = await create.product.with(productData)

			await create.file.with({
				user: user.id,
				product: productModel.id,
				content: coverImage,
				name: coverImage.name,
				size: coverImage.size
			})
		} catch (error) {
			console.error(`Error seeding product: ${error}`)
		}
	}

	console.info("Done seeding products")
}

await main()
