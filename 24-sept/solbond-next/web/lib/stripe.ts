import "server-only"

import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	// https://github.com/stripe/stripe-node#configuration
	// apiVersion: "2024-06-23",
	appInfo: {
		name: process.env.NEXT_PUBLIC_APP_NAME!,
		url: process.env.NEXT_PUBLIC_APP_URL!
	},
	typescript: true
})
