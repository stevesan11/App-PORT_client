import React from "react";

interface Props {
	children: React.ReactNode;
}
const CardY = (props: Props) => {
	return (
		<div className="w-screen h-[calc(100vh-70px-70px)] flex flex-col snap-y snap-mandatory overflow-auto">
			{props.children}
		</div>
	);
};

export default CardY;
