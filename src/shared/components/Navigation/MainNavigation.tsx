import React, { useState } from "react";

import Menu from "../../../images/menu_FILL0_wght400_GRAD0_opsz48.svg";

import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Auth from "../../../user/pages/Auth";

const MainNavigation = () => {
	const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false);
	const [loginModalIsOpen, setLoginModalIsOpen] = useState<boolean>(false);

	const openDrawerHandler: React.MouseEventHandler = () => {
		setDrawerIsOpen(true);
	};
	const closeDrawerHandler: React.MouseEventHandler = () => {
		setDrawerIsOpen(false);
	};
	const openLoginModalHandler: React.MouseEventHandler = () => {
		setLoginModalIsOpen(true);
	};
	const closeLoginModalHandler = (): void => {
		setLoginModalIsOpen(false);
	};

	return (
		<>
			{drawerIsOpen && (
				<>
					<SideDrawer onClose={closeDrawerHandler}>
						<nav className="h-full">
							<NavLinks onOpen={openLoginModalHandler} />
						</nav>
					</SideDrawer>
				</>
			)}
			{loginModalIsOpen && (
				<>
					<Auth onClose={closeLoginModalHandler} />
				</>
			)}
			<header className="w-screen h-[70px] flex items-center md:justify-between border-b border-gray">
				<button className="md:hidden ml-10" onClick={openDrawerHandler}>
					<Menu className="fill-gray" />
				</button>
				<h1 className="text-2xl md:text-3xl lg:text-4xl ml-10">App PORT</h1>
				<nav className="hidden md:flex items-center text-center">
					<NavLinks onOpen={openLoginModalHandler} />
				</nav>
			</header>
		</>
	);
};

export default MainNavigation;
