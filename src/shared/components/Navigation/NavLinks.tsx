import React from "react";
import { NavLink } from "react-router-dom";

const NavLinks = () => {
	return (
		<ul className="flex flex-col py-[30vh] gap-5 md:flex-row md:py-0 md:gap-0">
			<li>
				<NavLink
					to="/allapp"
					className="w-[140px] h-10 flex justify-center items-center border-gray md:border-l md:hover:border-y active:bg-orange"
				>
					All App
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/userId/myapp"
					className="w-[140px] h-10 flex justify-center items-center border-gray md:border-l md:hover:border-y active:bg-orange"
				>
					My App
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/userId/add"
					className="w-[140px] h-10 flex justify-center items-center border-gray md:border-l md:hover:border-y active:bg-orange"
				>
					Add New App
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/authenticate"
					className="w-[140px] h-10 flex justify-center items-center border-gray md:border-l md:hover:border-y md:hover:border-r active:bg-orange"
				>
					Login
				</NavLink>
			</li>
		</ul>
	);
};

export default NavLinks;