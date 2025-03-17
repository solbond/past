"use client"

import { useState } from "react"
import Tooltip from "../../Tooltip"
import { Image } from "react-ronin"
import { cn } from "@/lib/utils"
import { frankRuhlLibre } from "@/app/fonts"
import { Button } from "@/components/ui/button"
import React, { ChangeEvent } from "react"
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react"
import { XIcon } from "lucide-react"

export const ProfileBalanceSection: React.FC = () => {
	let [open, setOpen] = useState(false)

	return (
		<>
			<div className="flex-center flex-col items-center gap-4 rounded-xl border border-gray-300 py-8 dark:border-zinc-800 dark:bg-zinc-900">
				<div className="relative flex items-center justify-center">
					<h2 className={cn("text-8xl font-semibold tracking-tight", frankRuhlLibre.className)}>
						<span className="absolute right-full top-1/2 mr-3 -translate-y-1/2">
							<Image src="/images/coin.png" alt="coin" width={40} height={40} />
						</span>
						20
					</h2>
				</div>
				<div className="flex items-center justify-center gap-3">
					<Button
						variant="solbond-secondary"
						size="solbond"
						onClick={() => setOpen(true)}
						className="transition-all duration-300 hover:bg-opacity-20 hover:shadow-md hover:backdrop-blur-md"
					>
						Top up
					</Button>
					<Button
						variant="solbond-secondary"
						size="solbond"
						className="transition-all duration-300 hover:bg-opacity-20 hover:shadow-md hover:backdrop-blur-md"
					>
						Withdraw
					</Button>
				</div>

				<Tooltip label="What is token?" className="text-center font-medium opacity-60">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus nisi officia voluptates aut dolor. Dolore
					adipisci libero nulla officia ab iusto quia praesentium quisquam veniam?
				</Tooltip>
			</div>

			<Dialog open={open} onClose={setOpen} className="relative z-10">
				<DialogBackdrop
					transition
					className="fixed inset-0 bg-black/20 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in dark:bg-black/70"
				/>

				<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
					<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
						<DialogPanel
							transition
							className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 dark:bg-zinc-800"
						>
							<div className="flex items-center justify-between p-4">
								<Image src="/images/coin.png" alt="coin" width={40} height={40} />

								<div className="flex-grow text-center">
									<DialogTitle className="text-lg font-semibold">Top up Tokens</DialogTitle>
								</div>
								<Button
									variant="solbond-secondary"
									size="solbond"
									className="h-10 w-10 p-0"
									onClick={() => setOpen(false)}
								>
									<XIcon size={24} />
								</Button>
							</div>
							<PaymentContent />
						</DialogPanel>
					</div>
				</div>
			</Dialog>
		</>
	)
}

const PaymentContent: React.FC = () => {
	const priceOptions = [24.99, 34.99, 44.99, 279.99]
	const [selectedPrice, setSelectedPrice] = useState<string>("9.99")

	const selectPrice = (price: number) => {
		setSelectedPrice(price.toFixed(2))
	}

	const changePrice = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		if (value === "" || (/^\d*\.?\d{0,2}$/.test(value) && parseFloat(value) <= 1000)) {
			setSelectedPrice(value)
		}
	}

	const buttonPrice = () => {
		const price = parseFloat(selectedPrice)
		return isNaN(price) || price === 0 ? "0.00" : price.toFixed(2)
	}

	const disabledButton = () => {
		const price = parseFloat(selectedPrice)
		return isNaN(price) || price === 0 || price > 1000
	}

	return (
		<div className="mx-auto max-w-sm p-4">
			<div className="mb-6 text-center">
				<input
					type="text"
					inputMode="decimal"
					value={selectedPrice}
					onChange={changePrice}
					className="-mx-[10%] w-[120%] rounded-lg border border-neutral-200 bg-transparent py-5 text-center text-5xl font-medium shadow-[0_2px_4px_rgba(0,0,0,0.1)] transition-all focus:shadow-md focus:outline-none"
					placeholder="0"
				/>
			</div>

			<div className="mx-[auto] mb-6 flex w-[75%] justify-between space-x-1">
				{priceOptions.map(price => (
					<button
						key={price}
						className={`rounded-full px-4 py-2 text-sm transition-colors hover:opacity-70 ${
							price.toFixed(2) === selectedPrice ? "bg-neutral-500 text-white" : "bg-[--FillerBackground]"
						}`}
						onClick={() => selectPrice(price)}
					>
						{price.toFixed(2)}
					</button>
				))}
			</div>

			<button
				className={`mx-[auto] mb-4 flex w-[65%] items-center justify-center rounded-full py-3 text-lg font-semibold shadow-xl transition-all ${
					disabledButton()
						? "cursor-not-allowed bg-[--FillerBackground] opacity-50"
						: "bg-gradient-to-r from-pink-200 via-blue-200 to-pink-200 hover:opacity-70 hover:shadow-lg dark:text-black"
				}`}
				disabled={disabledButton()}
			>
				{disabledButton() ? "Enter or select amount" : `Buy for $${buttonPrice()}`}
			</button>
			<p className="cursor-pointer text-center text-sm opacity-50">Terms of Service</p>
		</div>
	)
}
