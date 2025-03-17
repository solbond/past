"use client"

import { motion } from "framer-motion"
import { forwardRef, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	title?: string
	error?: string
	noShift?: boolean
}

const labelVarians = {
	blur: { top: "25%", left: 12 },
	focused: { y: -20, left: 0 }
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, title, type, error, noShift, ...props }, ref) => {
		const [focused, setFocused] = useState(false)
		const [inputValue, setInputValue] = useState("")

		const innerRef = useRef<HTMLInputElement>(null)

		useEffect(() => {
			const currentRef = innerRef.current

			const handleFocus = () => setFocused(true)
			const handleBlur = (e: FocusEvent) => {
				if (e.target instanceof HTMLInputElement) {
					setInputValue(e.target.value)
				}
				setFocused(false)
			}

			if (currentRef) {
				currentRef.addEventListener("focus", handleFocus)
				currentRef.addEventListener("blur", handleBlur)
			}

			return () => {
				if (currentRef) {
					currentRef.removeEventListener("focus", handleFocus)
					currentRef.removeEventListener("blur", handleBlur)
				}
			}
		}, [])

		useEffect(() => {
			if (typeof ref === "function") {
				ref(innerRef.current)
			} else if (ref) {
				ref.current = innerRef.current
			}
		}, [ref])

		const labelText = title
		const labelState = focused || inputValue ? "focused" : "blur"

		return (
			<div
				className={cn("relative", {
					"pt-6": !noShift && (focused || inputValue)
				})}
			>
				{!noShift && (
					<motion.div
						animate={labelState}
						initial="blur"
						transition={{ easings: "easeInOut" }}
						variants={labelVarians}
						className={cn("absolute text-base opacity-50", {
							"text-destructive dark:text-destructive": error && !inputValue
						})}
					>
						{labelText}
					</motion.div>
				)}
				<input
					type={type || "text"}
					className={cn(
						"border-input flex h-11 w-full rounded-lg border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:opacity-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-900 dark:focus-visible:ring-zinc-600",
						{ "border-destructive dark:border-destructive placeholder:text-destructive/60": error },
						className
					)}
					ref={innerRef}
					{...props}
				/>
			</div>
		)
	}
)

Input.displayName = "Input"

export default Input
