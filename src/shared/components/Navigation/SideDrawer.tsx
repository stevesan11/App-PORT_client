import React from "react";

interface Props {
	onClose: React.MouseEventHandler<Element>;
	children: React.ReactNode;
}
const SideDrawer = (props: Props) => {
	return (
		<aside
			className="md:hidden fixed w-[60vw] h-screen flex z-[200] flex-col items-center text-center bg-gray text-black"
			onClick={props.onClose}
		>
			{props.children}
		</aside>
	);
};

export default SideDrawer;
