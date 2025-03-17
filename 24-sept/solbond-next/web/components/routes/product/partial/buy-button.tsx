"use client"

import { createCheckoutSession } from "@/app/actions/stripe"
import { FancySwitch } from "@/components/fancy-switch"
import { OptionValue } from "@/components/fancy-switch/types"
import { Button } from "@/components/ui/button"
import getStripe from "@/lib/helpers/stripe"
import { cn, currencyFormat } from "@/lib/utils"
import { ProductWithUser } from "@/types/common"
import Image from "next/image"
import { useState } from "react"
import toast from "react-hot-toast"

export const BuyButton: React.FC<{
	product: ProductWithUser
}> = ({ product }) => {
	const [loading, setLoading] = useState(false)
	const [paymentMethod, setPaymentMethod] = useState(1)

	const handleClick = async () => {
		setLoading(true)
		try {
			const [data, err] = await createCheckoutSession({ productId: product.id })

			if (err) {
				console.error(err)
				toast.error("Something went wrong, try again later")
				return
			}

			const { sessionId } = data
			const stripe = await getStripe()
			if (!stripe) return
			stripe.redirectToCheckout({ sessionId })
		} catch (error) {
			console.error(error)
			toast.error("Something went wrong, try again later")
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<div className="mt-4">
				<FancySwitch
					value={paymentMethod}
					onChange={(value: OptionValue) => setPaymentMethod(Number(value))}
					options={[
						{ label: "Token", value: 1 },
						{ label: "Crypto", value: 2 },
						{ label: "Card", value: 3 }
					]}
					className="flex rounded-full bg-zinc-200/60 p-1.5 dark:bg-zinc-800/90"
					highlighterClassName="bg-white dark:bg-zinc-950 rounded-full"
					radioClassName={cn(
						"relative flex h-10 cursor-pointer items-center justify-center rounded-full px-5 text-base font-semibold shadow-sm transition-colors focus:outline-none data-[checked]:text-zinc-900 dark:text-zinc-400 dark:data-[checked]:text-zinc-100"
					)}
				/>
			</div>
			<Button
				className="relative mt-3 h-14 w-full rounded-full text-base font-semibold shadow-none"
				onClick={handleClick}
				disabled={loading}
			>
				{loading && (
					<div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2">
						<div className="shadowRolling" />
					</div>
				)}

				<span>
					Pay with {paymentMethod === 1 ? "Token" : paymentMethod === 2 ? "Crypto" : "Card"}{" "}
					{currencyFormat(product.price)}
				</span>

				<div className="absolute right-4 top-4 flex items-center justify-center gap-2">
					{paymentMethod === 1 && <Image src="/images/coin.png" alt="Pay with Token" width={24} height={24} />}
					{paymentMethod === 2 && <Image src="/images/bitcoin.svg" alt="Pay with Crypto" width={24} height={24} />}
					{paymentMethod === 3 && <Image src="/images/stripe.svg" alt="Pay with Card" width={24} height={24} />}
				</div>
			</Button>
		</>
	)
}
