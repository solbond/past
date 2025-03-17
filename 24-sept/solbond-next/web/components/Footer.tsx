import Icon from "./Icons"
import { NavLink } from "./NavLink"
import { Container } from "./Container"

export function Footer() {
	return (
		<footer className="mt-16 bg-zinc-100 dark:bg-zinc-800/90">
			<Container>
				<div className="relative">
					<Icon name="FooterLogoV2" className="absolute inset-x-0 -top-14 mx-auto h-10 w-auto dark:text-zinc-100" />
					<nav className="mt-10 h-14 text-sm" aria-label="quick links">
						<div className="-my-1 flex justify-center gap-x-6">
							<NavLink href="#">About</NavLink>
							<NavLink href="#">Contact</NavLink>
							<NavLink href="#">Discord</NavLink>
						</div>
					</nav>
				</div>
			</Container>
		</footer>
	)
}
