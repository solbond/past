import Link from "next/link"

export function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
	return (
		<Link
			href={href}
			className="inline-block rounded-lg px-2 py-1 text-sm text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400"
		>
			{children}
		</Link>
	)
}
