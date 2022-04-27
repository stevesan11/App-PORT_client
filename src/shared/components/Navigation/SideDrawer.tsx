import React from "react";
import BackDrop from "../UIElements/BackDrop";

interface Props {
	onClose: React.MouseEventHandler<Element>;
	children: React.ReactNode;
}
const SideDrawer = (props: Props) => {
	return (
		<>
			<BackDrop onClose={props.onClose} />
			<aside
				className="md:hidden fixed w-[60vw] h-screen flex z-[200] flex-col items-center text-center bg-gray text-black"
				onClick={props.onClose}
			>
				{props.children}
			</aside>
		</>
	);
};

export default SideDrawer;
