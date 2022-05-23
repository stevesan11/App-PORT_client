import React from "react";
import { NavLink } from "react-router-dom";

interface Props {
	children: React.ReactNode;
	to: string;
}
const NavButton = (props: Props) => {
	return (
		<li>
			<NavLink
				to={props.to}
				className={({ isActive }) =>
					isActive
						? "w-[140px] h-10 flex justify-center items-center border-gray md:border-l md:border-y bg-orange"
						: "w-[140px] h-10 flex justify-center items-center border-gray md:border-l md:hover:border-y active:bg-orange"
				}
			>
				{props.children}
			</NavLink>
		</li>
	);
};
export default NavButton;
