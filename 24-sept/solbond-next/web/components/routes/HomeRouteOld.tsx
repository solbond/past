"use client"

import { motion } from "framer-motion"
import { useEffect, useRef } from "react"
import { proxy } from "valtio"
import { useProxy } from "valtio/utils"

const HomeRouteState = proxy({
	products: [
		{
			name: "Karabiner",
			description: "Course will teach you how to use macOS most efficiently",
			price: "60$",
			imageUrl: "",
			id: ""
		},
		{
			name: "Karabiner1",
			description: "Course will teach you how to use macOS most efficiently",
			price: "60$",
			imageUrl: "",
			id: ""
		},
		{
			name: "Karabiner2",
			description: "Course will teach you how to use macOS most efficiently",
			price: "60$",
			imageUrl: "",
			id: ""
		},
		{
			name: "Karabiner3",
			description: "Course will teach you how to use macOS most efficiently",
			price: "60$",
			imageUrl: "",
			id: ""
		},
		{
			name: "Karabiner4",
			description: "Course will teach you how to use macOS most efficiently",
			price: "60$",
			imageUrl: "",
			id: ""
		},
		{
			name: "Karabiner5",
			description: "Course will teach you how to use macOS most efficiently",
			price: "60$",
			imageUrl: "",
			id: ""
		}
	]
})
export default function HomeRoute(props: { authenticated: boolean }) {
	const local = useProxy(HomeRouteState)
	const scrollRef = useRef<any>(null)
	useEffect(() => {
		const scrollElement = scrollRef.current
		if (scrollElement) {
			scrollElement.scrollLeft = (scrollElement.scrollWidth - scrollElement.clientWidth) / 2
		}
	}, [local.products])

	return (
		<div className="relative">
			<div
				className="absolute right-0 top-0 z-[40] h-[600px] w-[200px]"
				style={{
					background:
						"linear-gradient(90deg, rgba(0,0,0,0) 0%,var(--PrimaryBackground) 60%, var(--PrimaryBackground) 100%)"
				}}
			></div>
			<motion.div className="relative flex gap-[10px] overflow-x-auto p-1 px-[100px]" ref={scrollRef}>
				{local.products.map((product, index) => (
					<motion.div
						// initial={{ translateX: 0 }}
						// animate={{ translateX: [0, "calc(100% + 20rem)"] }}
						// transition={{
						// 	duration: 4,
						// 	repeat: Infinity,
						// }}
						key={index}
						className="min-w-[400px] overflow-hidden rounded-lg border-2 border-slate-400/10 bg-[--SecondaryBackground] transition-all hover:border-fuchsia-400/70"
					>
						<div className="h-[300px] w-full bg-[--FillerBackground]"></div>
						<div className="p-6 text-[14px]">
							<div className="font-bold">{product.name}</div>
							<div className="opacity-60">{product.description}</div>
						</div>
					</motion.div>
				))}
			</motion.div>
			<div
				className="absolute left-0 top-0 z-[40] h-[600px] w-[200px]"
				style={{
					background:
						"linear-gradient(270deg, rgba(0,0,0,0) 0%,var(--PrimaryBackground) 60%, var(--PrimaryBackground) 100%)"
				}}
			></div>
		</div>
	)
}
