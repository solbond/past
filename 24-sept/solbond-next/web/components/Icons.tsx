import { cn } from "@/lib/utils"
import React from "react"

interface BaseIconProps extends React.SVGProps<SVGSVGElement> {
	width?: string
	height?: string
	fill?: string
	border?: string
}

const icons = {
	Logo: ({ className, ...props }: BaseIconProps) => (
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 128 30"
			preserveAspectRatio="xMidYMid meet"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
			className={cn(className)}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M16.5 0H8V30H17V29.9836C17.1653 29.9945 17.332 30 17.5 30C21.6421 30 25 26.6421 25 22.5C25 18.3579 21.6421 15 17.5 15C17.332 15 17.1653 15.0055 17 15.0164V14.9836C20.909 14.7263 24 11.4741 24 7.5C24 3.52588 20.909 0.273695 17 0.0164023V0H16.5Z"
				fill="url(#paint0_linear_8866_6341)"
			/>
			<rect x="8" width="18" height="30" fill="url(#paint1_linear_8866_6341)" />
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M7.5 30C11.6421 30 15 26.6421 15 22.5C15 18.3579 11.6421 15 7.5 15V30Z"
				fill="black"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M7.5 15V0C3.35786 0 0 3.35786 0 7.5C0 11.6421 3.35786 15 7.5 15Z"
				fill="black"
			/>
			<defs>
				<linearGradient id="paint0_linear_8866_6341" x1="13" y1="0" x2="13" y2="30" gradientUnits="userSpaceOnUse">
					<stop stopColor="#E701FB" />
					<stop offset="1" stopColor="#2358E0" />
				</linearGradient>
				<linearGradient id="paint1_linear_8866_6341" x1="26" y1="15" x2="8" y2="15" gradientUnits="userSpaceOnUse">
					<stop stopColor="white" stopOpacity="0.5" />
					<stop offset="1" stopColor="white" />
				</linearGradient>
			</defs>
		</svg>
	),
	FooterLogo: ({ className, ...props }: BaseIconProps) => (
		<svg
			width="24"
			height="30"
			viewBox="0 0 24 30"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
			className={cn(className)}
		>
			<circle cx="16.5" cy="7.5" r="7.5" fill="black" />
			<circle cx="16.5" cy="22.5" r="7.5" fill="black" />
			<rect x="9" width="7.5" height="15" fill="white" />
			<rect x="9" y="15" width="7.5" height="15" fill="#F7F7F7" />
			<circle cx="7.5" cy="7.5" r="7.5" fill="black" />
			<circle cx="7.5" cy="22.5" r="7.5" fill="black" />
			<rect x="7.5" width="7.5" height="15" fill="white" />
			<rect y="15" width="7.5" height="15" fill="#F7F7F7" />
		</svg>
	),
	FooterLogoV2: ({ className, ...props }: BaseIconProps) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="407px"
			height="407px"
			viewBox="0 0 407 407"
			{...props}
			className={cn("fill-current", className)}
		>
			<g>
				<path
					style={{ opacity: 0.95 }}
					fill="currentColor"
					d="M 124.5,5.5 C 128.767,5.20299 132.934,5.53632 137,6.5C 137.5,71.1658 137.667,135.832 137.5,200.5C 182.454,203.389 213.287,225.722 230,267.5C 243.289,316.73 229.122,355.897 187.5,385C 171.142,394.673 153.475,399.173 134.5,398.5C 134.5,333.5 134.5,268.5 134.5,203.5C 90.9807,200.819 60.4807,179.485 43,139.5C 29.4448,96.6224 38.9448,59.7891 71.5,29C 87.1345,16.4065 104.801,8.57322 124.5,5.5 Z"
				/>
			</g>
			<g>
				<path
					style={{ opacity: 0.957 }}
					fill="currentColor"
					d="M 252.5,5.5 C 295.872,6.92929 326.705,27.2626 345,66.5C 360.386,112.306 350.219,151.139 314.5,183C 301.994,192.473 287.994,198.806 272.5,202C 315.357,213.189 341.524,240.356 351,283.5C 355.921,326.851 340.421,360.684 304.5,385C 288.183,394.663 270.516,399.163 251.5,398.5C 251.169,267.43 251.502,136.43 252.5,5.5 Z"
				/>
			</g>
		</svg>
	),
	ArrowRight: ({ className, ...props }: BaseIconProps) => (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
			className={cn(className)}
		>
			<path
				d="M14.25 12L8.75 7.75V16.25L14.25 12Z"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			></path>
		</svg>
	),
	FancyArrow: () => (
		<svg
			className="svg-icon"
			xmlns="http://www.w3.org/2000/svg"
			version="1.1"
			width="18"
			height="18"
			stroke="white"
			fill="white"
			x="0"
			y="0"
			viewBox="0 0 32 32"
		>
			<g>
				<path d="M26.68 3.867H8.175a1 1 0 0 0 0 2h16.544L4.2 26.387A1 1 0 1 0 5.613 27.8l20.52-20.52v16.545a1 1 0 0 0 2 0V5.321a1.456 1.456 0 0 0-1.453-1.454z"></path>
			</g>
		</svg>
	),
	Delete: () => (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M5.75 7.75L6.59115 17.4233C6.68102 18.4568 7.54622 19.25 8.58363 19.25H14.4164C15.4538 19.25 16.319 18.4568 16.4088 17.4233L17.25 7.75H5.75Z"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			></path>
			<path
				d="M9.75 10.75V16.25"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			></path>
			<path
				d="M13.25 10.75V16.25"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			></path>
			<path
				d="M8.75 7.75V6.75C8.75 5.64543 9.64543 4.75 10.75 4.75H12.25C13.3546 4.75 14.25 5.64543 14.25 6.75V7.75"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			></path>
			<path
				d="M4.75 7.75H18.25"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			></path>
		</svg>
	),
	File: () => (
		<svg width="34" height="34" fill="none" viewBox="0 0 24 24">
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.5"
				d="M7.75 19.25H16.25C17.3546 19.25 18.25 18.3546 18.25 17.25V9L14 4.75H7.75C6.64543 4.75 5.75 5.64543 5.75 6.75V17.25C5.75 18.3546 6.64543 19.25 7.75 19.25Z"
			></path>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.5"
				d="M18 9.25H13.75V5"
			></path>
		</svg>
	),
	CodeBlock: () => (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.5"
				d="m15.75 8.75 3.5 3.25-3.5 3.25m-7.5-6.5L4.75 12l3.5 3.25m5-9.5-2.5 12.5"
			></path>
		</svg>
	),
	Bold: () => (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M6.75 4.75H12.5C14.5711 4.75 16.25 6.42893 16.25 8.5C16.25 10.5711 14.5711 12.25 12.5 12.25H6.75V4.75Z"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			></path>
			<path
				d="M6.75 12.25H13.75C15.683 12.25 17.25 13.817 17.25 15.75C17.25 17.683 15.683 19.25 13.75 19.25H6.75V12.25Z"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			></path>
		</svg>
	),
	Heading: () => (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M5.75 5.75H7.25M7.25 5.75H8.25M7.25 5.75V11.75M7.25 18.25H5.75M7.25 18.25H8.25M7.25 18.25V11.75M7.25 11.75H16.75M16.75 11.75V5.75M16.75 11.75V18.25M18.25 5.75H16.75M16.75 5.75H15.75M16.75 18.25H18.25M16.75 18.25H15.75"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			></path>
		</svg>
	),
	Link: () => (
		<svg width="24" height="24" fill="none" viewBox="0 0 24 24">
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.5"
				d="M16.75 13.25L18 12C19.6569 10.3431 19.6569 7.65685 18 6V6C16.3431 4.34315 13.6569 4.34315 12 6L10.75 7.25"
			></path>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.5"
				d="M7.25 10.75L6 12C4.34315 13.6569 4.34315 16.3431 6 18V18C7.65685 19.6569 10.3431 19.6569 12 18L13.25 16.75"
			></path>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.5"
				d="M14.25 9.75L9.75 14.25"
			></path>
		</svg>
	),

	ArrowDown: () => (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M12 15.25L16.25 9.75H7.75L12 15.25Z"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			></path>
		</svg>
	),
	Search: () => (
		<svg width="24" height="24" fill="none" viewBox="0 0 24 24">
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.5"
				d="M19.25 19.25L15.5 15.5M4.75 11C4.75 7.54822 7.54822 4.75 11 4.75C14.4518 4.75 17.25 7.54822 17.25 11C17.25 14.4518 14.4518 17.25 11 17.25C7.54822 17.25 4.75 14.4518 4.75 11Z"
			></path>
		</svg>
	),
	Copy: () => (
		<svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M6.25 14.25C6.25 14.25 4.75 14 4.75 12C4.75 10.2869 6.07542 8.88339 7.75672 8.75897C7.88168 6.5239 9.73368 4.75 12 4.75C14.2663 4.75 16.1183 6.5239 16.2433 8.75897C17.9246 8.88339 19.25 10.2869 19.25 12C19.25 14 17.75 14.25 17.75 14.25"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			></path>
			<path
				d="M14.25 16.75L12 19.25L9.75 16.75"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			></path>
			<path
				d="M12 18.25V12.75"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			></path>
		</svg>
	),
	Heart: () => (
		<svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
			<path
				fillRule="evenodd"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.5"
				d="M11.995 7.23319C10.5455 5.60999 8.12832 5.17335 6.31215 6.65972C4.49599 8.14609 4.2403 10.6312 5.66654 12.3892L11.995 18.25L18.3235 12.3892C19.7498 10.6312 19.5253 8.13046 17.6779 6.65972C15.8305 5.18899 13.4446 5.60999 11.995 7.23319Z"
				clipRule="evenodd"
			></path>
		</svg>
	),
	InactiveHeart: ({ className, fill = "none", ...props }: BaseIconProps) => (
		<svg width="24" height="24" viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg" {...props}>
			<path
				d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
				stroke="currentColor"
				strokeWidth="1.5"
			/>
		</svg>
	),
	Camera: () => (
		<svg width="28" height="25" viewBox="0 0 28 25" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M14 9.875C11.9289 9.875 10.25 11.5539 10.25 13.625C10.25 15.6961 11.9289 17.375 14 17.375C16.0711 17.375 17.75 15.6961 17.75 13.625C17.75 13.2407 17.6922 12.8698 17.5848 12.5207C17.2908 13.1719 16.6358 13.625 15.875 13.625C14.8395 13.625 14 12.7855 14 11.75C14 10.9892 14.4531 10.3342 15.1043 10.0402C14.7552 9.93282 14.3843 9.875 14 9.875ZM6.25 4.25L7.28563 1.66093C7.54209 1.01977 8.31138 0.5 8.99425 0.5H19.0058C19.6929 0.5 20.4588 1.02212 20.7144 1.66093L21.75 4.25H25.2489C26.6302 4.25 27.75 5.36814 27.75 6.75266V21.7473C27.75 23.1295 26.6293 24.25 25.2489 24.25H2.75113C1.36979 24.25 0.25 23.1319 0.25 21.7473V6.75266C0.25 5.37048 1.37068 4.25 2.75113 4.25H6.25ZM2.75113 6.75L2.75 21.7473L25.2489 21.75L25.25 6.75266L20.6838 6.74999C20.3378 6.75 19.9538 6.49225 19.8251 6.17228L18.5494 3L9.44269 2.99973L8.17697 6.16402C8.04752 6.48765 7.66347 6.75 7.31637 6.75H2.75113ZM7.75 13.625C7.75 10.1732 10.5482 7.375 14 7.375C17.4518 7.375 20.25 10.1732 20.25 13.625C20.25 17.0768 17.4518 19.875 14 19.875C10.5482 19.875 7.75 17.0768 7.75 13.625Z"
				fill="black"
			/>
		</svg>
	),
	Sparkles: () => (
		<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
			<path
				d="M259.92 262.91L216.4 149.77a9 9 0 00-16.8 0l-43.52 113.14a9 9 0 01-5.17 5.17L37.77 311.6a9 9 0 000 16.8l113.14 43.52a9 9 0 015.17 5.17l43.52 113.14a9 9 0 0016.8 0l43.52-113.14a9 9 0 015.17-5.17l113.14-43.52a9 9 0 000-16.8l-113.14-43.52a9 9 0 01-5.17-5.17zM108 68L88 16 68 68 16 88l52 20 20 52 20-52 52-20-52-20zM426.67 117.33L400 48l-26.67 69.33L304 144l69.33 26.67L400 240l26.67-69.33L496 144l-69.33-26.67z"
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="32"
			/>
		</svg>
	),
	ArrowGoBack: () => (
		<svg
			className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
		</svg>
	),
	Coin: () => (
		<svg width="24" height="24" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect x="1.5" y="1.5" width="42" height="42" rx="21" fill="#F8CA74" stroke="#D5A448" stroke-width="3" />
		</svg>
	)
} as const satisfies Record<string, (props: BaseIconProps) => React.JSX.Element>

interface IconProps extends BaseIconProps {
	name: keyof typeof icons
}
export default function Icon(props: IconProps): React.JSX.Element {
	return icons[props.name](props)
}
