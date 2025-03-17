export default function PaySuccess() {
	return (
		<div className="flex-center fixed left-0 top-0 z-10 h-screen w-screen flex-col gap-[40px] bg-black text-white">
			<div className="z-30">
				<div className="flex-center flex-col">
					<div
						className="text-[40px] font-bold"
						style={{
							background: "linear-gradient(120deg, #F6CF85 0%,  #FC9D2D 100%)",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
							WebkitTextStroke: "2px #000",
							fontFamily: "sans-serif"
						}}
					>
						Success!
					</div>
					<div className="center flex flex-col items-center">
						<div className="text-[48px]">300</div>
						<div className="text-[14px] opacity-40">token is credited to your account</div>
					</div>
				</div>
			</div>
		</div>
	)
}
