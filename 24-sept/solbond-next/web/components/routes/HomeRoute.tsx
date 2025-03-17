"use client"
import { frankRuhlLibre } from "@/app/fonts"
import { cn } from "@/lib/utils"
import backgroundImage from "@/public/images/background.png"
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import { Product } from "@ronin/solbond"
import Image from "next/image"
import Link from "next/link"
import { forwardRef, useEffect, useState } from "react"
import { Image as RoninImage } from "react-ronin"
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules"
import { Swiper, SwiperSlide, useSwiper } from "swiper/react"
import { Container } from "../Container"
import { Search } from "../Search"
import { Button } from "../ui/button"
import "swiper/css"
import "swiper/css/scrollbar"

export function HomeRoute({ products }: { products: Product[] }) {
	return (
		<div className="relative isolate overflow-hidden">
			<Image className="absolute left-1/2 top-20 max-w-none -translate-x-1/2" src={backgroundImage} alt="" priority />
			<div className="relative py-24 lg:pb-40">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h1 className={cn("text-4xl font-bold sm:text-6xl", frankRuhlLibre.className)}>
							Sell digital goods easily
						</h1>
						<p className="pb-10 pt-5 text-xl leading-8">
							Entrepreneurial communities and software to help you earn online.
						</p>
						<div className="px-4 sm:px-8 md:px-16 lg:px-24">
							<Search layoutId="homeSearch" />
						</div>
					</div>
					<ProductSlider products={products} />
				</Container>
			</div>
		</div>
	)
}

const ProductSlider = (props: { products: Product[] }) => {
	const [swiperLoaded, setSwiperLoaded] = useState(false)

	return (
		<div className="relative mt-16 w-full sm:mt-24">
			<Swiper
				modules={[Navigation, Pagination, Scrollbar, A11y]}
				spaceBetween={0}
				slidesPerView={3}
				cssMode
				style={{ position: "initial" }}
				className="h-full w-full"
				breakpoints={{
					0: {
						slidesPerView: 1
					},
					640: {
						slidesPerView: 3.1
					},
					768: {
						slidesPerView: 2.1
					},
					1024: {
						slidesPerView: 3
					}
				}}
				loop
				slidesOffsetBefore={16}
				onSwiper={swiper => {
					if (!swiperLoaded) {
						setSwiperLoaded(true)
					}
				}}
				onSlideChange={() => console.log("slide change")}
			>
				<SwiperButton className={cn(swiperLoaded ? "opacity-100" : "opacity-0")} />

				{/* {Array.from({ length: 6 }).map((_, i) => ( */}

				{props.products.map((product, i) => (
					<SwiperSlide
						key={i}
						className={cn("px-2 pb-6", {
							"opacity-0": !swiperLoaded
						})}
					>
						<Link href="/" className="no-underline">
							<div className="flex flex-row flex-wrap items-start justify-start rounded-lg bg-white shadow-md dark:bg-zinc-800/90">
								<div className="block w-full flex-[0_0_auto]">
									<div className="relative">
										<div className="relative w-full overflow-hidden rounded-tl-lg rounded-tr-lg bg-[#f0efef] bg-cover bg-[50%] bg-no-repeat pt-[55%]">
											{/* <Image
												className="absolute left-0 top-0 object-cover opacity-100 transition-opacity"
												src={product.coverImage.src}
												style={{ width: '100%', height: '100%' }}
												alt={product.coverImage.name || ''}
												width={0}
												height={0}
												sizes="100vw"
												priority
											/> */}
											<RoninImage
												src={product.coverImage.src}
												width={0}
												height={200}
												style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
											/>
										</div>
									</div>
								</div>

								<div className="block w-full flex-[0_0_auto] p-4">
									<p className="mb-1 line-clamp-2 text-base font-semibold md:text-lg">{product.title}</p>
									<div>
										<div className="text-sm font-normal text-zinc-600 md:mb-1.5 lg:text-base dark:text-zinc-400">
											{product.subtitle}
										</div>
									</div>
								</div>
							</div>
						</Link>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}

const SwiperButton = forwardRef<HTMLButtonElement, React.HTMLAttributes<HTMLButtonElement>>(({ className }, ref) => {
	const swiper = useSwiper()

	return (
		<>
			<Button
				size="icon"
				className={cn(
					"absolute -left-4 right-auto top-[calc(50%-3rem)] z-10 size-11 rounded-full bg-white text-zinc-900 shadow-lg hover:bg-gray-100 dark:bg-zinc-800/90 dark:text-zinc-100 hover:dark:bg-zinc-800/80",
					className
				)}
				onClick={() => swiper.slidePrev()}
			>
				<ChevronLeftIcon className="h-6 w-6" />
			</Button>
			<Button
				size="icon"
				className={cn(
					"absolute -right-4 left-auto top-[calc(50%-3rem)] z-10 size-11 rounded-full bg-white text-zinc-900 shadow-lg hover:bg-gray-100 dark:bg-zinc-800/90 dark:text-zinc-100 hover:dark:bg-zinc-800/80",
					className
				)}
				onClick={() => swiper.slideNext()}
			>
				<ChevronRightIcon className="h-6 w-6" />
			</Button>
		</>
	)
})
