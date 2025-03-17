import type { Stripe } from "stripe"
import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { headers } from "next/headers"

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
	const body = await req.text()
	const signature = headers().get("stripe-signature")!

	let event: Stripe.Event

	try {
		event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
	} catch (err) {
		const errorMessage = err instanceof Error ? err.message : "Unknown error"
		console.error(`Webhook Error: ${errorMessage}`)
		return NextResponse.json({ message: `Webhook Error: ${errorMessage}` }, { status: 400 })
	}

	const data: Stripe.Event.Data = event.data
	const eventType: string = event.type

	if (eventType === "checkout.session.completed") {
		const session = data.object as Stripe.Checkout.Session
		console.log("Checkout session completed", session)
	}

	return NextResponse.json({ message: "Received" }, { status: 200 })
}
