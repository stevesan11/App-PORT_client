import React, { useState } from "react";



import Modal from "../UIElements/Modal";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Auth from "../../pages/user/Auth";

import Menu from "../../images/menu_FILL0_wght400_GRAD0_opsz48.svg";

const MainNavigation = () => {
	const [drawerIsOpen, setDrawerIsOpen] = useState(false);
	const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);

	const openDrawerHandler: React.MouseEventHandler = () => {
		setDrawerIsOpen(true);
	};
	const closeDrawerHandler: React.MouseEventHandler = () => {
		setDrawerIsOpen(false);
	};
	const openLoginModalHandler: React.MouseEventHandler = () => {
		setLoginModalIsOpen(true);
	};
	const closeLoginModalHandler = () => {
		setLoginModalIsOpen(false);
	};

	return (
		<>
			<SideDrawer show={drawerIsOpen} onClose={closeDrawerHandler}>
				<nav className="h-full">
					<NavLinks onOpen={openLoginModalHandler} />
				</nav>
			</SideDrawer>
			<Modal show={loginModalIsOpen} onClose={closeLoginModalHandler}>
				<Auth onClose={closeLoginModalHandler} />
			</Modal>
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
