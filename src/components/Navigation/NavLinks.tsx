import React from "react";

import { useAppDispatch, useAppSelector } from "../../shared/redux/hooks";
import { logout } from "../../shared/redux/authSlice";

import NavButton from "./NavButton";

interface Props {
	onOpen: React.MouseEventHandler<Element>;
}
const NavLinks = (props: Props) => {
	const auth = useAppSelector((state) => state.auth);
	const { userId, isLoggedIn } = auth;
	const dispatch = useAppDispatch();

	return (
		<ul className="flex flex-col py-[30vh] gap-5 md:flex-row md:py-0 md:gap-0">
			<NavButton to="/">All App</NavButton>
			{!isLoggedIn && (
				<li>
					<button
						className="w-[140px] h-10 flex justify-center items-center border-gray md:border-l md:hover:border-y md:hover:border-r active:bg-orange"
						onClick={props.onOpen}
					>
						Login
					</button>
				</li>
			)}
			{isLoggedIn && (
				<>
					<NavButton to={`/${userId}/app`}>My App</NavButton>
					<NavButton to="/app/new">Add New App</NavButton>
					<li>
						<button
							className="w-[140px] h-10 flex justify-center items-center border-gray md:border-l md:hover:border-y md:hover:border-r hover:bg-maroon"
							onClick={() => dispatch(logout())}
						>
							Logout
						</button>
					</li>
				</>
			)}
		</ul>
	);
};

export default NavLinks;
