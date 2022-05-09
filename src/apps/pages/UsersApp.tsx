import React from "react";

import AppList from "../components/AppList";
import AppItem from "../components/AppItem";

import { userList } from "../../DUMMY/DUMMY_DATA";

const UserApps = () => {
	return (
		<div className="w-screen h-[calc(100vh-70px-70px)] flex flex-col snap-y snap-mandatory overflow-auto">
			{userList.map((user) => (
				<AppList key={user.id}>
					{user.apps.map((app) => (
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
					))}
				</AppList>
			))}
		</div>
	);
};

export default UserApps;
