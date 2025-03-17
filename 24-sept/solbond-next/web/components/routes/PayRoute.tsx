export default function PayRoute() {
	return (
		<div className="flex-center fixed left-0 top-0 z-10 h-screen w-screen flex-col gap-[40px] bg-black text-white">
			<img
				src="https://storage.ronin.co/spa_vtavi6txvlhef4ja/0f67ce25-dc3c-4058-82b8-cbe6bd234d56"
				alt=""
				className="absolute bottom-0 right-[8%] z-20 w-[500px]"
			/>
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
						Buy Tokens
					</div>
					<div className="text-[14px] opacity-40">mail@gmail.com</div>
				</div>
			</div>
			<div className="z-30 flex w-[500px] flex-col items-center gap-[20px] rounded-md bg-[#121212] p-[20px]">
				<div className="flex-center h-[140px] w-full flex-col rounded-md border-2 border-slate-400/20 bg-black">
					<div className="text-[14px] opacity-40">Your buying</div>
					<div className="text-[48px]">300</div>
				</div>
				<button className="flex-center h-[50px] w-full rounded-md bg-[#FC9D2D] text-black">Pay $8.99</button>
				<button className="text-[14px] opacity-40">Terms of Service</button>
			</div>
		</div>
	)
}
