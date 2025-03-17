import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

export default function Tooltip(props: { children: any; label: string; className?: string }) {
	const [hovered, setHovered] = useState(false)
	return (
		<div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="relative">
			<p className={props.className}>{props.label}</p>

			<AnimatePresence>
				{hovered && (
					<motion.div
						animate={{ scale: [0.9, 1.01, 1], opacity: [0, 1] }}
						initial={{ translateX: "-50%" }}
						exit={{ opacity: 0 }}
						transition={{ easings: "easeOut", duration: 0.2 }}
						className="absolute left-1/2 top-full z-10 mt-2 w-[300px] transform rounded-lg bg-[--FillerBackground] p-4"
					>
						<div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-[50%] -translate-y-[50%] rotate-45 transform bg-[--FillerBackground]"></div>
						<p className="relative flex flex-col items-center text-sm">{props.children}</p>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
