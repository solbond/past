import type { File, Product } from "@ronin/solbond"

interface ProductWithFiles extends Product {
	files: File[]
}

interface ProductWithUser extends Omit<ProductSchema, "spherePayCheckoutLink"> {}
