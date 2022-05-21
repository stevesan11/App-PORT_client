import React from "react";

import Cancel from "../../images/cancel_FILL0_wght400_GRAD0_opsz48.svg";

interface Props {
	onClose: React.MouseEventHandler<Element>;
}
const CancelButton = (props: Props) => {
	return (
		<button className="block scale-50" onClick={props.onClose}>
			<Cancel className="fill-black hover:opacity-30" />
		</button>
	);
};

export default CancelButton;
