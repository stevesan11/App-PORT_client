import React from "react";
import { NavLink } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { logout } from "../../../redux/authSlice";

interface Props {
	onOpen: React.MouseEventHandler<Element>;
}
const NavLinks = (props: Props) => {
	const auth = useAppSelector((state) => state.auth);
	const { userId } = auth;
	const dispatch = useAppDispatch();
	const { isLoggedIn } = auth;

	return (
		<ul className="flex flex-col py-[30vh] gap-5 md:flex-row md:py-0 md:gap-0">
			<li>
				<NavLink
					to="/"
					className={({ isActive }) =>
						isActive
							? "w-[140px] h-10 flex justify-center items-center border-gray md:border-l md:border-y bg-orange"
							: "w-[140px] h-10 flex justify-center items-center border-gray md:border-l md:hover:border-y active:bg-orange"
					}
				>
					All App
				</NavLink>
			</li>

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
					<li>
						<NavLink
							to={`/${userId}/app`}
							className={({ isActive }) =>
								isActive
									? "w-[140px] h-10 flex justify-center items-center border-gray md:border-l md:border-y bg-orange"
									: "w-[140px] h-10 flex justify-center items-center border-gray md:border-l md:hover:border-y active:bg-orange"
							}
						>
							My App
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/app/new"
							className={({ isActive }) =>
								isActive
									? "w-[140px] h-10 flex justify-center items-center border-gray md:border-l md:border-y bg-orange"
									: "w-[140px] h-10 flex justify-center items-center border-gray md:border-l md:hover:border-y active:bg-orange"
							}
						>
							Add New App
						</NavLink>
					</li>
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
