import React from "react";
import { Link } from "react-router-dom";

import CardX from "../UIElements/CardX";
import Content from "../UIElements/Content";
import AppItem from "./AppItem";

interface Props {
	user: {
		userId: string;
		username: string;
		userImg: string;
	};
	items: Array<{
		_id: string;
		image: string;
		title: string;
		description: string;
		url: string;
	}>;
	onDelete: (appId: string, title: string) => void;
}
const AppList = (props: Props) => {
	const { userId, username, userImg } = props.user;

	if (props.items.length === 0) {
		return (
			<Content>
				<div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray sm:rounded-md">
					<div className="flex flex-col items-center gap-10 cursor-default text-maroon">
						<h2 className="text-2xl lg:text-3xl font-bold">
							No app found. May be create one?
						</h2>
						<Link
							to={"/app/new"}
							className="text-center bg-maroon text-gray w-1/2 sm:w-1/3  p-2 rounded-md hover:bg-orange hover:opacity-80"
						>
							Share App
						</Link>
					</div>
				</div>
			</Content>
		);
	}

	return (
		<CardX>
			{props.items.map((item) => {
				return (
					<AppItem
						key={item._id}
						id={item._id}
						appData={{
							img: item.image,
							title: item.title,
							description: item.description,
							url: item.url,
							authorId: userId,
							username: username,
							userImg: userImg,
						}}
						onDelete={props.onDelete}
					/>
				);
			})}
		</CardX>
	);
};

export default AppList;
