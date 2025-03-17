import { forwardRef } from "react"
import Icon from "./Icons"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { cn } from "@/lib/utils"
import { useAtom } from "jotai"
import { searchAtom } from "@/store/search"
import { backdropAtom } from "@/store/backdrop"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"

interface SearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
	layoutId?: string
}

export const Search = forwardRef<HTMLInputElement, SearchProps>(({ className, layoutId, ...props }, ref) => {
	const [search, setSearch] = useAtom(searchAtom)
	const [, setIsOpen] = useAtom(backdropAtom)
	const [wideScreen, setWideScreen] = useState(false)
	const pathname = usePathname()

	const searchIconPosition =
		!search.isOpen && pathname !== "/" && !wideScreen
			? "left-1/2 -translate-x-1/2 pl-0"
			: "left-3 sm:left-1/2 sm:-translate-x-1/2 lg:left-3 lg:translate-x-0"

	useEffect(() => {
		const checkScreenWidth = () => setWideScreen(window.innerWidth >= 640)
		checkScreenWidth()
		window.addEventListener("resize", checkScreenWidth)
		return () => window.removeEventListener("resize", checkScreenWidth)
	}, [])

	const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
		setSearch(prev => ({ ...prev, isOpen: true, isFocused: true }))
		setIsOpen(true)
		props.onFocus && props.onFocus(e)
	}

	return (
		<>
			<Label className="sr-only">Search</Label>
			<div className="relative my-2 w-full rounded-md">
				<div className={`pointer-events-none absolute inset-y-0 flex items-center ${searchIconPosition}`}>
					<Icon name="Search" className="size-5 text-zinc-300" />
				</div>
				<Input
					value={search.query}
					onChange={e => setSearch({ ...search, query: e.target.value })}
					onFocus={handleFocus}
					onBlur={() => setSearch({ ...search, isFocused: false })}
					type="search"
					aria-label="Search"
					placeholder={(!search.isOpen && wideScreen) || pathname === "/" ? "Search for something cool" : ""}
					className={cn(
						"h-12 rounded-full border-0 bg-white text-base text-black focus-visible:ring-transparent dark:bg-zinc-800/90 dark:text-zinc-300",
						!search.isOpen && pathname !== "/" && !wideScreen ? "pl-0 pr-0" : "pl-11 pr-4",
						"sm:h-10 sm:w-10 sm:p-2 sm:pl-2 sm:pr-2",
						"lg:h-12 lg:w-full lg:pl-11 lg:pr-4 lg:text-base",
						"outline-none",
						className
					)}
					{...props}
					ref={ref}
				/>
			</div>
		</>
	)
})
