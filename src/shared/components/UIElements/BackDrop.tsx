import React from "react";
import ReactDOM from "react-dom";

interface Props {
	onClose: React.MouseEventHandler<Element>;
}
const BackDrop = (props: Props) => {
	const container = document.querySelector<HTMLElement>("#backdrop");
	if (!container) {
		throw new Error("#backdrop is not found");
	}

	return ReactDOM.createPortal(
		<div
			className="w-full h-full fixed top-0 left-0 bg-black opacity-80 z-[100]"
			onClick={props.onClose}
		></div>,
		container
	);
};

export default BackDrop;
