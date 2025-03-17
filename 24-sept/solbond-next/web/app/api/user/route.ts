import { NextRequest, NextResponse } from "next/server"
import { clerkClient } from "@clerk/nextjs/server"
import { create, get } from "ronin"
import { urlToFile } from "@/lib/utils"

export async function POST(request: NextRequest) {
	try {
		const data = await request.json()

		// is clerk user exists
		const _User = await clerkClient().users.getUser(data.userId)

		if (!_User) {
			// "Clerk User not found"
			return NextResponse.json({ message: "Clerk User not found" }, { status: 404 })
		}

		// if clerk user exists, check if user exists in Ronin
		const roninUser = await get.user.with({ clerkId: _User.id })

		// if user exists in Ronin, return user
		if (roninUser) {
			// "User already exists in Ronin"
			return NextResponse.json({ user: roninUser }, { status: 200 })
		}

		// get user's email address
		let emailAddress = _User.primaryEmailAddress?.emailAddress

		if (!emailAddress) {
			// look up the user's email address
			if (_User.emailAddresses.length > 0) {
				emailAddress = _User.emailAddresses[0].emailAddress
			}
		}

		let profileImage = _User.imageUrl ? await urlToFile(_User.imageUrl, "profile-image") : undefined

		await create.user.with({
			email: emailAddress,
			clerkId: _User.id,
			...(_User.fullName && { prettyName: _User.fullName }),
			...(profileImage && { profileImage })
		})

		return NextResponse.json({ user: roninUser }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ message: "Invalid request" }, { status: 400 })
	}
}
