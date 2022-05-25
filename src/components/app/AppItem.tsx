import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useAppSelector } from "../../shared/redux/hooks";

import Content from "../UIElements/Content";

interface Props {
	id: string;
	appData: {
		img: string;
		title: string;
		description: string;
		url: string;
		authorId: string;
		username: string;
		userImg: string;
	};
	onDelete: (appId: string, title: string) => void;
}
const AppItem = (props: Props) => {
	const auth = useAppSelector((state) => state.auth);
	const { userId } = auth;
	const [isClicked, setIsClicked] = useState(false);

	const { img, title, description, url, authorId, username, userImg } =
		props.appData;

	const clickHandler: React.MouseEventHandler = () => {
		setIsClicked((prev) => !prev);
	};

	return (
		<Content onClick={clickHandler}>
			<img
				src={`${process.env.AWS_URL}/${img}`}
				className="w-full h-full object-contain"
			/>
			{isClicked && (
				<div className="absolute top-0 left-0 w-full h-full flex flex-col gap-5 justify-center items-center bg-black sm:rounded-md opacity-80">
					<div className="flex flex-col items-center gap-3 cursor-default">
						<h2 className="text-2xl lg:text-3xl font-bold">{title}</h2>
						<p className="px-32">{description}</p>
					</div>
					<div className="flex items-center gap-3">
						<img
							src={`${process.env.AWS_URL}/${userImg}`}
							className="w-10 h-10 rounded-full"
						/>
						<p className="cursor-default">created by {username}</p>
					</div>
					<div className="flex gap-5">
						<a href={url} className="border px-12 py-2 rounded-lg">
							Visit to Page
						</a>
						{userId === authorId && (
							<>
								<Link
									to={`/app/${props.id}`}
									className="border px-3 p-2 rounded-lg"
								>
									Edit App
								</Link>
								<button
									className="border px-3 p-2 rounded-lg"
									onClick={() => props.onDelete(props.id, title)}
								>
									Delete
								</button>
							</>
						)}
					</div>
				</div>
			)}
		</Content>
	);
};

export default AppItem;
