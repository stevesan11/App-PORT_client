import React from "react";

import AppList from "../components/AppList";
import AppItem from "../components/AppItem";
import { useAppSelector } from "../../redux/hooks";

import { UserData } from "../../model/FormModel";
import { userList } from "../../DUMMY/DUMMY_DATA";

const Myapp = () => {
	const auth = useAppSelector((state) => state.auth);
	const { userId } = auth;
	const user: UserData | undefined = userList.find(
		(user) => user.email === userId
	);
	if (!user) {
		throw new Error("Cannnot Find userData");
	}

	return (
		<div className="w-screen h-[calc(100vh-70px-70px)] flex flex-col snap-y snap-mandatory overflow-auto">
			<AppList>
				{user.apps.map((app) => {
					return (
						<AppItem
							key={app.id}
							id={app.id}
							img={app.image}
							title={app.title}
							description={app.description}
							author={user.username}
							userImg={user.image}
							userId={user.email}
						/>
					);
				})}
			</AppList>
		</div>
	);
};

export default Myapp;
