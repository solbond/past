"use client"

import { cn } from "@/lib/utils"
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { UserIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { Logo } from "./Logo"
import { Search } from "./Search"
import Link from "next/link"
import { useAtom } from "jotai"
import { searchAtom } from "@/store/search"
import { LINKS } from "@/lib/constant"
import { XIcon } from "lucide-react"

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {}

export function Header({ className }: HeaderProps) {
	const [search, setSearch] = useAtom(searchAtom)
	const pathname = usePathname()

	useEffect(() => {
		setSearch(prev => ({ ...prev, isOpen: false, query: "" }))
	}, [pathname, setSearch])

	const isHomePage = pathname === "/"

	if (search.isOpen) {
		return (
			<header
				className={cn(
					"fixed inset-x-0 top-0 z-20 bg-white dark:bg-[--PrimaryBackground]",
					"flex min-h-[64px] items-center",
					className
				)}
				onClick={e => e.stopPropagation()}
			>
				<div className="container mx-auto flex w-full items-center justify-between px-4 sm:px-6 lg:px-8">
					<Link href="/" className="-m-1.5 hidden p-1.5 sm:block">
						<Logo className="h-[25px] w-[107px] md:h-[30px] md:w-[128px]" />
					</Link>
					<div className="flex w-full items-center sm:absolute sm:left-1/2 sm:top-1/2 sm:max-w-3xl sm:-translate-x-1/2 sm:-translate-y-1/2 sm:px-4">
						<div className="relative w-full">
							<Search
								layoutId="headerSearch"
								autoFocus
								className="h-14 w-full rounded-full border"
								placeholder="Search for something cool"
							/>
						</div>
						<button
							className="ml-2 rounded-full bg-[--FillerBackground] p-2 text-neutral-500 hover:opacity-50 sm:hidden"
							onClick={() => setSearch(prev => ({ ...prev, isOpen: false }))}
						>
							<XIcon size={20} />
						</button>
					</div>
					<div className="hidden items-center space-x-2 sm:flex sm:space-x-4">
						{!pathname.includes("new") && (
							<Link
								href={LINKS.productsNew}
								className="flex items-center rounded-full bg-gradient-to-b from-pink-300 to-blue-300 px-3 py-3 text-sm font-semibold text-neutral-800 shadow-md transition-all hover:from-pink-300 hover:to-blue-200 hover:opacity-100 sm:px-4 sm:py-2"
							>
								Sell
							</Link>
						)}
					</div>
				</div>
			</header>
		)
	}

	return (
		<header
			className={cn("sticky inset-x-0 top-0 z-20 py-2 backdrop-blur-sm transition-opacity", className)}
			onClick={e => e.stopPropagation()}
		>
			<nav
				className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8"
				aria-label="Global"
			>
				<div className="flex items-center">
					<Link href="/" className="-m-1.5 p-1.5">
						<Logo className="h-[25px] w-[107px] md:h-[30px] md:w-[128px]" />
					</Link>
				</div>

				{!isHomePage && (
					<div className="hidden flex-1 lg:flex">
						<div className="mx-auto w-10 sm:w-10 lg:mx-6 lg:grow">
							<Search
								layoutId="headerSearch"
								className="h-10 bg-zinc-100 shadow-sm transition-all duration-300 ease-out lg:h-12 lg:w-full lg:rounded-full lg:pl-11"
								placeholder="Search for something cool"
							/>
						</div>
					</div>
				)}

				<div className="flex items-center space-x-2 sm:space-x-4 lg:flex-1 lg:justify-end">
					{(!isHomePage || search.isOpen) && (
						<div className="block lg:hidden">
							<Search layoutId="headerSearchSmall" className="h-10 w-10 rounded-full bg-zinc-100 p-0 shadow-sm" />
						</div>
					)}

					{!pathname.includes("new") && (
						<Link
							href={LINKS.productsNew}
							className="flex items-center rounded-full bg-gradient-to-b from-pink-300 to-blue-300 px-3 py-1.5 text-sm font-semibold text-neutral-800 shadow-md transition-all hover:from-pink-300 hover:to-blue-200 hover:opacity-100 sm:px-4 sm:py-2 lg:px-6 lg:py-3 lg:text-lg"
						>
							Sell
						</Link>
					)}
				</div>
			</nav>
		</header>
	)
}

export default Header
