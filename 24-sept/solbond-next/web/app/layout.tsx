import type { Metadata } from "next"

import { Toaster } from "react-hot-toast"
import { cn } from "@/lib/utils"
import { inter } from "./fonts"
import "./globals.css"
import { JotaiProvider } from "@/lib/providers/jotai-provider"

export const metadata: Metadata = {
	title: "Solbond",
	description: "Buy/sell things"
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" className="h-full scroll-smooth bg-white antialiased dark:bg-black">
			<body className={cn(inter.className, "flex h-full flex-col transition-all duration-300 dark:bg-black")}>
				<JotaiProvider>{children}</JotaiProvider>
				<Toaster />
			</body>
		</html>
	)
}
