import { getCurrentRoninUser } from "@/app/actions"
import { ProfileSetup } from "@/components/routes/ProfileSetup"
import { redirect } from "next/navigation"

export default async function ProfileSetupPage() {
	const roninUser = await getCurrentRoninUser()

	if (!roninUser) {
		redirect("/sign-in")
	}

	return <ProfileSetup user={roninUser} />
}
