import type { Config } from "tailwindcss"
import type { PluginAPI } from "tailwindcss/types/config"
import plugin from "tailwindcss/plugin"

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}"
	],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px"
			}
		},
		extend: {
			textShadow: {
				"blue-glow": "0 0 20px #8ac8ff",
				"pink-glow": "0 0 20px rgba(192 38 211)"
			},
			boxShadow: {
				"custom-blue": "0px 2px 10px 0 rgba(138, 200, 255, 1)",
				"custom-pink": "0px 0px 15px 0 rgba(192 38 211)"
			},
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))"
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))"
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))"
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))"
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))"
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))"
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))"
				}
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)"
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" }
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" }
				},
				"gradient-x": {
					"0%, 100%": {
						"background-position": "0% 50%"
					},
					"50%": {
						"background-position": "100% 50%"
					}
				}
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"gradient-x": "gradient-x 2s ease infinite"
			},
			screens: {
				"max-2xl": { max: "1535px" },
				"max-xl": { max: "1279px" },
				"max-lg": { max: "1023px" },
				"max-md": { max: "767px" },
				"max-sm": { max: "639px" }
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		require("tailwindcss-textshadow"),
		require("@tailwindcss/typography"),
		plugin(function ({ addUtilities }: PluginAPI) {
			addUtilities({
				".flex-center": {
					display: "flex",
					"align-items": "center",
					"justify-content": "center"
				},
				".shadow": {
					filter: "drop-shadow(2px 8px 4px #05050570)"
				},

				".flex-between": {
					display: "flex",
					"align-items": "center",
					"justify-content": "space-between"
				},

				".flex-col": {
					display: "flex",
					"flex-direction": "column"
				},

				".flex-row": {
					display: "flex",
					"flex-direction": "row"
				},
				".button-hover": {
					color: "#F28C28",
					"border-radius": "4px",
					"transition-property": "all",
					"transition-timing-function": "cubic-bezier(0.4, 0, 0.2, 1)",
					"transition-duration": "150ms",
					background: "rgb(38 38 38)",
					cursor: "pointer"
				}
			})
		})
	]
} satisfies Config

export default config
