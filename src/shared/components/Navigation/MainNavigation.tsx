import React, { useState } from "react";

import NavLinks from "./NavLinks";

import Menu from "../../../images/menu_FILL0_wght400_GRAD0_opsz48.svg";
import BackDrop from "../UIElements/BackDrop";
import SideDrawer from "./SideDrawer";

const MainNavigation = () => {
	const [drawerisOpen, setDrawerIsOpen] = useState<boolean>(false);

	const openDrawerHandler: React.MouseEventHandler = () => {
		setDrawerIsOpen(true);
	};
	const closeDrawerHandler: React.MouseEventHandler = () => {
		setDrawerIsOpen(false);
	};

	return (
		<>
			{drawerisOpen && (
				<>
					<BackDrop onClose={closeDrawerHandler} />
					<SideDrawer onClose={closeDrawerHandler}>
						<nav className="h-full">
							<NavLinks />
						</nav>
					</SideDrawer>
				</>
			)}
			<header className="w-screen h-[70px] flex items-center md:justify-between border-b border-gray">
				<button className="md:hidden ml-10" onClick={openDrawerHandler}>
					<Menu className="fill-gray w-12 h-12" />
				</button>
				<h1 className="text-2xl md:text-3xl lg:text-4xl ml-10">App PORT</h1>
				<nav className="hidden md:flex items-center text-center">
					<NavLinks />
				</nav>
			</header>
		</>
	);
};

export default MainNavigation;
