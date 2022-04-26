import React from "react";

interface Props {
	type: "button" | "submit" | "reset";
	disabled: boolean;
	onClick?: () => void;
	children: string;
}
const Button = (props: Props) => {
	return (
		<button
			type={props.type}
			className={`w-1/3 p-2 rounded-md ${
				props.disabled === true
					? "bg-orange cursor-pointer hover:opacity-80 "
					: "border border-maroon text-maroon cursor-not-allowed"
			}`}
			disabled={props.disabled}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
};

export default Button;
