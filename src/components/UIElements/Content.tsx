import React from "react";

interface Props {
	children: React.ReactNode;
	onClick?: React.MouseEventHandler;
}
const Content = (props: Props) => {
	return (
		<div className="shrink-0 snap-center w-full h-full flex items-center justify-center">
			<div
				className="w-full h-full max-w-[1024px] sm:max-h-[calc(100vh-20vh-70px-70px)] border bg-gray p-3 sm:rounded-md relative"
				onClick={props.onClick}
			>
				{props.children}
			</div>
		</div>
	);
};

export default Content;
