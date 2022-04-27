import React from "react";
import ReactDOM from "react-dom";

interface Props {
	show: boolean;
	children: React.ReactNode;
}
const Modal = (props: Props) => {
	const container = document.querySelector("#modal");
	if (!container) {
		throw new Error("#modal is not found");
	}

	const content = props.show && (
		<div className="top-[calc(100vh-70px)]">
			<div className="flex justify-center align-middle text-center">
				<div className="mt-[150px] w-screen max-w-[640px] sm:max-h-[calc(100vh-70px-20vh)] p-10 bg-gray text-black sm:rounded-lg fixed z-[200]">
					{props.children}
				</div>
			</div>
		</div>
	);

	return ReactDOM.createPortal(content, container);
};

export default Modal;
