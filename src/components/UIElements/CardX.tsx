import React from "react";

interface Props {
	children: React.ReactNode;
}
const CardX = (props: Props) => {
	return (
		<div className="shrink-0 snap-center w-full h-full flex snap-x snap-mandatory overflow-auto">
			{props.children}
		</div>
	);
};

export default CardX;
