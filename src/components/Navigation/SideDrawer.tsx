import React from "react";
import ReactDOM from "react-dom";

import BackDrop from "../UIElements/BackDrop";

interface Props {
	show: boolean;
	onClose: React.MouseEventHandler<Element>;
	children: React.ReactNode;
}
const SideDrawer = (props: Props) => {
	const container = document.querySelector("#sideDrawer");
	if (!container) {
		throw new Error("#sideDrawer is not found");
	}
	const content = props.show && (
		<>
			<BackDrop onClose={props.onClose} />
			<aside
				className="md:hidden fixed w-[60vw] h-screen flex z-modal flex-col items-center text-center bg-gray text-black"
				onClick={props.onClose}
			>
				{props.children}
			</aside>
		</>
	);
	return ReactDOM.createPortal(content, container);
};

export default SideDrawer;
