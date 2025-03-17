"use client"

import { backdropAtom } from "@/store/backdrop"
import { useAtom } from "jotai"
import { motion, AnimatePresence } from "framer-motion"
import { searchAtom } from "@/store/search"

interface BackdropProps extends React.HTMLAttributes<HTMLDivElement> {
	children?: React.ReactNode
}

export const Backdrop: React.FC<BackdropProps> = ({ children }) => {
	const [isOpen, setIsOpen] = useAtom(backdropAtom)
	const [search, setSearch] = useAtom(searchAtom)

	const overlayClick = () => {
		setSearch({ ...search, isOpen: false, isFocused: false, query: "" })
		setIsOpen(false)
	}

	return (
		<div className="relative z-10">
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
						animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
						exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
						transition={{ duration: 0.3 }}
						className="fixed inset-0 w-screen overflow-y-auto bg-zinc-200/80 dark:bg-black/70"
						onClick={overlayClick}
					>
						{children}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
