import { frankRuhlLibre } from "@/app/fonts"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { User } from "@ronin/solbond"
import Image from "next/image"
import Link from "next/link"
import { count } from "ronin"

type MyProfileSectionProps = {
	user: User
	isAuthorized: boolean
}

export const MyProfileSection: React.FC<MyProfileSectionProps> = async ({ user, isAuthorized }) => {
	async function getUserProductStats(user: User) {
		const [countLikedProducts, countSoldProducts, countBoughtProducts] = await Promise.all([
			count.likedProducts({
				with: { user: user.id }
			}),
			count.stripePayments({
				with: { seller: user.id }
			}),
			count.purchasedProducts({
				with: { user: user.id }
			})
		])

		return {
			countLikedProducts,
			countSoldProducts,
			countBoughtProducts
		}
	}

	const { countLikedProducts, countSoldProducts, countBoughtProducts } = await getUserProductStats(user)

	return (
		<section>
			<div className="flex flex-col sm:flex-row sm:space-x-5">
				<div className="mb-4 flex-shrink-0 sm:mb-0">
					<div className="relative">
						<Image
							src={user.profileImage.src}
							alt={user.prettyName}
							width={112}
							height={112}
							className="h-28 w-28 rounded-full"
						/>
						<span aria-hidden="true" className="absolute inset-0 rounded-full" />
					</div>
				</div>
				<div>
					<h1 className={cn("text-4xl font-bold lg:text-4xl dark:text-zinc-100", frankRuhlLibre.className)}>
						{user.prettyName}
					</h1>
					<div className="mt-2 flex flex-row gap-x-2 text-base font-medium lg:gap-x-4">
						<div className="flex items-center gap-x-1.5">
							<dd>{countSoldProducts}</dd>
							<dt>sold</dt>
						</div>
						<div className="flex items-center gap-x-1.5">
							<dd>{countBoughtProducts}</dd>
							<dt>bought</dt>
						</div>
						<div className="flex items-center gap-x-1.5">
							<dd>{countLikedProducts}</dd>
							<dt>liked</dt>
						</div>
					</div>
					{isAuthorized && (
						<div className="mt-5">
							<Link
								href="/profile-setup"
								className="inline-block rounded-full bg-zinc-200/60 px-4 py-2 font-semibold shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition hover:cursor-pointer hover:bg-zinc-200 dark:bg-zinc-800/90 dark:ring-white/10 hover:dark:bg-zinc-800/90 dark:hover:ring-white/20"
							>
								Edit profile
							</Link>
						</div>
					)}
				</div>
			</div>
		</section>
	)
}

export const MyProfileSectionSkeleton: React.FC = () => {
	return (
		<section>
			<div className="flex space-x-5">
				<div className="flex-shrink-0">
					<Skeleton className="h-28 w-28 rounded-full dark:bg-zinc-800/90" />
				</div>
				<div>
					<Skeleton className="h-8 w-48 text-4xl dark:bg-zinc-800/90" />
					<div className="mt-2 flex gap-x-4 text-base font-medium">
						<div className="flex items-center gap-x-1.5">
							<Skeleton className="h-4 w-4 dark:bg-zinc-800/90" />
							<Skeleton className="h-4 w-4 dark:bg-zinc-800/90" />
						</div>
						<div className="flex items-center gap-x-1.5">
							<Skeleton className="h-4 w-4 dark:bg-zinc-800/90" />
							<Skeleton className="h-4 w-4 dark:bg-zinc-800/90" />
						</div>
						<div className="flex items-center gap-x-1.5">
							<Skeleton className="h-4 w-4 dark:bg-zinc-800/90" />
							<Skeleton className="h-4 w-4 dark:bg-zinc-800/90" />
						</div>
					</div>
					<div className="mt-4">
						<Skeleton className="h-8 w-24 dark:bg-zinc-800/90" />
					</div>
				</div>
			</div>
		</section>
	)
}
