export default function Ticket(props: { children: any }) {
	return (
		<div className="relative w-fit bg-white p-[6px] px-3 text-black">
			<div
				className="absolute left-[-6px] top-0 h-[40%] w-[12px] bg-white"
				style={{ borderRadius: "4px 0px 0px 8px" }}
			></div>
			<div className="absolute left-[-8px] top-[50%] h-[25%] w-[10px] translate-y-[-50%] rounded-full border-r-[2px] border-white bg-transparent"></div>
			<div
				className="absolute bottom-0 left-[-6px] h-[40%] w-[12px] bg-white"
				style={{ borderRadius: "8px 0px 0px 4px" }}
			></div>
			<div>{props.children}</div>
			<div
				className="absolute right-[-6px] top-0 h-[40%] w-[12px] bg-white"
				style={{ borderRadius: "0px 4px 8px 0px" }}
			></div>
			<div className="absolute right-[-8px] top-[50%] h-[25%] w-[10px] translate-y-[-50%] rounded-full border-l-[2px] border-white bg-transparent"></div>
			<div
				className="absolute bottom-0 right-[-6px] h-[40%] w-[12px] bg-white"
				style={{ borderRadius: "0px 8px 4px 0px" }}
			></div>
		</div>
	)
}
