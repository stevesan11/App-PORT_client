import React from "react";

interface Props {
	type: "button" | "submit" | "reset";
	btnStyle: string;
	btnSize?: string;
	disabled?: boolean;
	onClick?: React.MouseEventHandler<Element>;
	children: string;
}
const Button = (props: Props) => {
	let btnStyle;
	switch (props.btnStyle) {
		case "submit_btn":
			btnStyle =
				props.disabled === true
					? "border border-maroon text-maroon cursor-not-allowed"
					: "bg-orange cursor-pointer hover:opacity-80";
			break;
		case "switch_btn":
			btnStyle =
				"bg-gray text-orange border border-orange cursor-pointer hover:bg-orange hover:opacity-80 hover:text-gray";
			break;
		case "upload_btn":
			btnStyle = "bg-maroon text-gray";
			break;
		case "cancel_btn":
			btnStyle = "bg-orange cursor-pointer hover:opacity-80";
			break;
		default:
			break;
	}

	let btnSize;
	switch (props.btnSize) {
		case "sm":
			btnSize = "w-3/12 sm:w-2/12  p-1 rounded-md";
			break;
		default:
			btnSize = "w-1/2 sm:w-1/3  p-2 rounded-md";
			break;
	}

	return (
		<button
			type={props.type}
			className={`${btnStyle} ${btnSize}`}
			disabled={props.disabled}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
};

export default Button;
