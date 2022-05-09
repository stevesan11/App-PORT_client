import Image1 from "../images/Screen Shot 2022-04-29 at 12.19.55.png";
import Image2 from "../images/building_takoyaki_yatai.png";
import Image3 from "../images/images3.jpeg";

import { UserData, AppData } from "../model/FormModel";

export const appList: AppData[] = [
	{
		id: "a1",
		title: "first app",
		description: "this is firstApp",
		image: Image1,
		url: "https://github.com/stevesan11",
		author: "Suzuki",
	},
	{
		id: "a2",
		title: "second app",
		description: "this is secondApp",
		image: Image1,
		url: "https://github.com/stevesan11",
		author: "Suzuki",
	},
	{
		id: "a3",
		title: "third app",
		description: "this is thirdApp",
		image: Image1,
		url: "https://github.com/stevesan11",
		author: "Yuki",
	},
	{
		id: "a4",
		title: "fourth app",
		description: "this is fourthApp",
		image: Image1,
		url: "https://github.com/stevesan11",
		author: "Yuki",
	},
];

export const userList: UserData[] = [
	{
		id: "u1",
		image: Image2,
		username: "Suzuki",
		email: "test@test.com",
		password: "Qwe123123",
		apps: [
			{
				id: "a1",
				title: "first app",
				description: "this is firstApp",
				image: Image1,
				url: "https://github.com/stevesan11",
				author: "Suzuki",
			},
			{
				id: "a2",
				title: "second app",
				description: "this is secondApp",
				image: Image1,
				url: "https://github.com/stevesan11",
				author: "Suzuki",
			},
		],
	},
	{
		id: "u2",
		image: Image3,
		username: "Yuki",
		email: "test1@test.com",
		password: "Qwe123123",
		apps: [
			{
				id: "a3",
				title: "third app",
				description: "this is thirdApp",
				image: Image1,
				url: "https://github.com/stevesan11",
				author: "Yuki",
			},
			{
				id: "a4",
				title: "fourth app",
				description: "this is fourthApp",
				image: Image1,
				url: "https://github.com/stevesan11",
				author: "Yuki",
			},
		],
	},
];
