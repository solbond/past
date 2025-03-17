"use client"

import { toggleLike } from "@/app/actions/product"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { HeartIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

export const LikeButton: React.FC<{ productId: string; isLiked?: boolean }> = ({ productId, isLiked = true }) => {
	const [liked, setLiked] = useState(isLiked)
	const pathname = usePathname()

	const handleClick = async () => {
		setLiked(!liked)

		await toggleLike({ productId, path: pathname })
		toast.success(liked ? "Product added to liked products" : "Product removed from liked products")
	}

	return (
		<Button
			variant="solbond-secondary"
			size="solbond"
			className="absolute right-4 top-4 flex size-10 items-center justify-center p-0"
			onClick={handleClick}
		>
			<HeartIcon
				size={20}
				className={cn("fill-current dark:text-zinc-400", liked ? "fill-current text-zinc-900" : "fill-none")}
			/>
		</Button>
	)
}
