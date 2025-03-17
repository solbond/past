import { ProfileImageSection, ProfileYourPageSection } from "../../ProfileSetup"

export const UpdateProfileFormSection: React.FC = () => {
	return (
		<div className="space-y-4">
			<h2 className="text-base font-semibold">Complete your profile</h2>

			<div className="space-y-6 rounded-lg bg-zinc-100 p-6 dark:bg-zinc-800">
				<section>
					<ProfileImageSection />
				</section>

				<section className="space-y-5">
					<ProfileYourPageSection />
				</section>
			</div>
		</div>
	)
}
