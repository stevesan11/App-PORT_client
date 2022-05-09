import React from "react";
import ReactDOM from "react-dom";
import BackDrop from "./BackDrop";

interface Props {
	show: boolean;
	children: React.ReactNode;
	onClose: React.MouseEventHandler<Element>;
}
const Modal = (props: Props) => {
	const container = document.querySelector("#modal");
	if (!container) {
		throw new Error("#modal is not found");
	}

	const content = props.show && (
		<>
			<BackDrop onClose={props.onClose} />
			<div className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center text-center">
				<div className="w-screen max-w-[640px] sm:max-h-[calc(100vh-70px-20vh)] p-10 sm:rounded-lg  bg-gray text-black fixed z-[200] overflow-auto">
					{props.children}
				</div>
			</div>
		</>
	);

	return ReactDOM.createPortal(content, container);
};

export default Modal;

// mt-[calc(70px+10vh)]
