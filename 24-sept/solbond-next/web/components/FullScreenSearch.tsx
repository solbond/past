import React, { useState, useEffect } from "react"
import { useAtom } from "jotai"
import { searchAtom } from "@/store/search"
import { Backdrop } from "./Backdrop"
import { HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons"
import { useDebounce } from "use-debounce"
import { cn } from "@/lib/utils"
import { frankRuhlLibre } from "@/app/fonts"

export const FullScreenSearch: React.FC = () => {
	const postsData = [
		{
			id: 1,
			title: "Karabiner course and two lines of title",
			href: "#",
			description:
				"Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel iusto corrupti dicta laboris incididunt. Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel iusto corrupti dicta laboris incididunt.",
			imageUrl:
				"https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
			date: "Mar 16, 2020",
			datetime: "2020-03-16",
			category: { title: "Marketing", href: "#" },
			author: {
				name: "Michael Foster",
				href: "#",
				imageUrl:
					"https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
			}
		},
		{
			id: 2,
			title: "Karabiner course and two lines of title Karabiner course and two lines of title",
			href: "#",
			description:
				"Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel iusto corrupti dicta laboris incididunt. Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel iusto corrupti dicta laboris incididunt.",
			imageUrl:
				"https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
			date: "Mar 16, 2020",
			datetime: "2020-03-16",
			category: { title: "Marketing", href: "#" },
			author: {
				name: "Michael Foster",
				href: "#",
				imageUrl:
					"https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
			}
		}
	]

	const posts = Array.from({ length: 10 }, (_, index) => ({
		...postsData[index % 2],
		id: index + 1
	}))

	const [search] = useAtom(searchAtom)
	const [q] = useDebounce(search.query, 500)
	const [liked, setLiked] = useState<{ [key: number]: boolean }>({})

	useEffect(() => {
		if (q) {
			console.log(q)
		}
	}, [q])

	const toggleLike = (id: number, event: React.MouseEvent) => {
		event.preventDefault()
		event.stopPropagation()
		setLiked(prevLiked => ({
			...prevLiked,
			[id]: !prevLiked[id]
		}))
	}

	return (
		<Backdrop>
			<div className="flex min-h-full items-center justify-center px-4 py-28">
				<div className="w-full max-w-2xl lg:max-w-5xl" onClick={e => e.stopPropagation()}>
					<div className="space-y-6 rounded-2xl">
						{posts.map((post, key) => (
							<article
								key={key}
								className="relative isolate flex flex-col gap-5 rounded-xl bg-white lg:min-h-[220px] lg:flex-row dark:bg-[--FillerBackground]"
							>
								<div className="relative aspect-[16/9] sm:aspect-[3/2] lg:aspect-auto lg:w-1/3 lg:shrink-0">
									<img
										alt=""
										src={post.imageUrl}
										className="absolute inset-0 h-full w-full rounded-t-2xl object-cover lg:rounded-l-2xl lg:rounded-r-none"
									/>
									<div className="absolute inset-0 rounded-t-2xl ring-1 ring-inset ring-gray-900/10 lg:rounded-l-2xl lg:rounded-r-none" />
								</div>
								<div className="flex flex-grow flex-col justify-between p-5 pt-0 lg:py-4 lg:pl-0">
									<div className="flex items-center gap-x-4 text-xs">
										<button
											onClick={e => toggleLike(post.id, e)}
											className={`absolute right-5 top-5 z-10 rounded-full p-2 transition-all hover:cursor-pointer ${
												liked[post.id] ? "bg-red-400/50 text-red-600" : "bg-neutral-200"
											}`}
										>
											{liked[post.id] ? (
												<HeartFilledIcon className="h-5 w-5 text-red-500" />
											) : (
												<HeartIcon className="h-5 w-5 text-gray-400" />
											)}
										</button>
									</div>
									<div className="group relative max-w-xl">
										<h3
											className={cn(
												"cursor-pointer text-xl font-medium transition-all duration-200 hover:opacity-40 sm:text-xl lg:text-3xl",
												frankRuhlLibre.className
											)}
										>
											<a href={post.href}>
												<span className="absolute inset-0" />
												{post.title}
											</a>
										</h3>
										<p className="line-clamp-3 text-sm leading-6">{post.description}</p>
									</div>
									<div className="mt-auto flex cursor-pointer items-center space-x-2 text-base font-medium">
										<a href={post.category.href}>{post.category.title} by</a>
										<img alt="" src={post.author.imageUrl} className="h-8 w-8 rounded-full" />
										<a href={post.author.href}>
											<p className="transition-all duration-200 hover:text-blue-300">{post.author.name}</p>
										</a>
									</div>
								</div>
							</article>
						))}
					</div>
				</div>
			</div>
		</Backdrop>
	)
}
