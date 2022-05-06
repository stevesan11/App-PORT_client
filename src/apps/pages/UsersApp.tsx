import React from "react";

import Image1 from "../../images/Screen Shot 2022-04-29 at 12.19.55.png";
import Image2 from "../../images/Screen Shot 2022-05-02 at 10.49.32.png";
import Image3 from "../../images/images3.jpeg";
import Image4 from "../../images/building_takoyaki_yatai.png";

import AppList from "../components/AppList";
import AppItem from "../components/AppItem";

const DUMMY_USERS_APP = [
	{
		id: "u1",
		username: "Suzuki",
		email: "test@test.com",
		password: "Qwe123123",
		img: Image3,
		apps: [
			{
				id: "t1",
				title: "test app",
				description: "this is a test",
				img: Image1,
				url: "https://github.com/stevesan11/",
				author: {
					username: "Suzuki",
					email: "test@test.com",
					password: "Qwe12321",
					img: Image3,
				},
			},
			{
				id: "t2",
				title: "test app",
				description: "this is a test",
				img: Image2,
				url: "https://github.com/stevesan11/",
				author: {
					username: "Suzuki",
					email: "test@test.com",
					password: "Qwe12321",
					img: Image3,
				},
			},
		],
	},
	{
		id: "u2",
		username: "Yuki",
		email: "test1@test.com",
		password: "Qwe123123",
		img: Image4,
		apps: [
			{
				id: "t3",
				title: "test app",
				description: "this is a test",
				img: Image1,
				url: "https://github.com/stevesan11/",
				author: {
					id: "u2",
					username: "Yuki",
					email: "test1@test.com",
					password: "Qwe123123",
					img: Image4,
				},
			},
			{
				id: "t4",
				title: "test app",
				description: "this is a test",
				img: Image2,
				url: "https://github.com/stevesan11/",
				author: {
					id: "u2",
					username: "Yuki",
					email: "test1@test.com",
					password: "Qwe123123",
					img: Image4,
				},
			},
		],
	},
];

const UserApps = () => {
	return (
		<div className="w-screen h-[calc(100vh-70px-70px)] flex flex-col snap-y snap-mandatory overflow-auto">
			{DUMMY_USERS_APP.map((user) => (
				<AppList key={user.id}>
					{user.apps.map((app) => (
						<AppItem
							key={app.id}
							id={app.id}
							img={app.img}
							title={app.title}
							description={app.description}
							author={app.author.username}
							userImg={app.author.img}
							userId={app.author.email}
						/>
					))}
				</AppList>
			))}
		</div>
	);
};

export default UserApps;
