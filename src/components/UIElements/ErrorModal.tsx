import React from "react";
import ReactDOM from "react-dom";
import CancelButton from "../FormElement/CancelButton";
import Modal from "./Modal";

interface Props {
	show: boolean;
	message: string | undefined;
	onClose: React.MouseEventHandler<Element>;
}
const ErrorModal = (props: Props) => {
	const container = document.querySelector("#modal");
	if (!container) {
		throw new Error("#modal is not found");
	}

	const content = props.show && (
		<Modal show={props.show} onClose={props.onClose} zIndex={"error"}>
			<div className="flex items-center justify-start m-0">
				<CancelButton onClose={props.onClose} />
				<p>{props.message}</p>
			</div>
		</Modal>
	);

	return ReactDOM.createPortal(content, container);
};

export default ErrorModal;
