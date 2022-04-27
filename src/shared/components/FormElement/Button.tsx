import React from "react";

interface Props {
	type: "button" | "submit" | "reset";
	btnStyle: string;
	disabled?: boolean;
	onClick?: () => void;
	children: string;
}
const Button = (props: Props) => {
	let btn;
	if (props.btnStyle === "submit_btn") {
		btn =
			props.disabled === true
				? "border border-maroon text-maroon cursor-not-allowed"
				: "bg-orange cursor-pointer hover:opacity-80";
	} else if (props.btnStyle === "switch_btn") {
		btn =
			"bg-gray text-orange border border-orange cursor-pointer hover:bg-orange hover:opacity-80 hover:text-gray";
	}

	return (
		<button
			type={props.type}
			className={`w-1/3 p-2 rounded-md ${btn}`}
			disabled={props.disabled}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
};

export default Button;
