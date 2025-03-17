import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"

export default function PageLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<Header />
			<main className="flex-grow">{children}</main>
			<Footer />
		</>
	)
}
