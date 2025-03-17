import Link from "next/link"
import { SlimLayout } from "@/components/SlimLayout"
import { Logo } from "@/components/Logo"
import Icon from "@/components/Icons"

export default function NotFound() {
	return (
		<SlimLayout>
			<div className="mb-16 flex">
				<Link href="/" aria-label="Home">
					<Logo className="h-8 w-auto" />
				</Link>
			</div>
			<p className="mb-2 text-2xl font-bold">404</p>
			<h1 className="mb-4 text-3xl font-semibold">Page not found</h1>
			<p className="mb-8 text-lg opacity-80">Sorry, we couldn't find the page you're looking for.</p>
			<Link href="/" className="font-lg group inline-flex items-center transition-all hover:opacity-80">
				<Icon name="ArrowGoBack" className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
				Go back home
			</Link>
		</SlimLayout>
	)
}
