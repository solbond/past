import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

// Mock user data for development
const mockUser = {
	id: "1",
	username: "demo_user"
	// Add other user properties as needed
}

export default async function Profile({ params }: { params: { username: string } }) {
	// For now, we'll just use mock data
	const user = mockUser
	const isAuthorized = true // Simplified auth check

	return (
		<div className="mx-auto mt-8 grid max-w-7xl grid-cols-1 gap-6 px-5 sm:px-6 lg:grid-flow-col-dense lg:grid-cols-3 lg:py-16">
			<div className={cn("lg:col-span-2")}>
				<div className="rounded-lg border p-6">
					<h1 className="text-2xl font-bold">Profile</h1>
					<p className="text-gray-600">@{params.username}</p>
				</div>

				<Separator className="my-8 dark:bg-zinc-700" />

				<div className="space-y-6">
					<section>
						<h2 className="mb-5 text-lg font-bold">Products</h2>
						<div className="rounded-lg border p-4">
							<p className="text-gray-500">No products yet</p>
						</div>
					</section>

					{isAuthorized && (
						<section>
							<h2 className="mb-5 text-lg font-bold">Purchased</h2>
							<div className="rounded-lg border p-4">
								<p className="text-gray-500">No purchases yet</p>
							</div>
						</section>
					)}

					<section>
						<h2 className="mb-5 text-lg font-bold">Liked</h2>
						<div className="rounded-lg border p-4">
							<p className="text-gray-500">No liked items yet</p>
						</div>
					</section>
				</div>
			</div>

			{isAuthorized && (
				<section className="lg:col-span-1">
					<div className="rounded-lg border p-4">
						<h2 className="text-lg font-bold">Balance</h2>
						<p className="text-gray-500">$0.00</p>
					</div>
				</section>
			)}
		</div>
	)
}
