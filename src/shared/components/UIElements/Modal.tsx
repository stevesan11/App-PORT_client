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
			<div className="flex justify-center align-middle text-center">
				<div className="mt-[calc(70px+10vh)] w-screen max-w-[640px] sm:max-h-[calc(100vh-70px-20vh)] p-10 bg-gray text-black sm:rounded-lg fixed z-[200]">
					{props.children}
				</div>
			</div>
		</>
	);

	return ReactDOM.createPortal(content, container);
};

export default Modal;
