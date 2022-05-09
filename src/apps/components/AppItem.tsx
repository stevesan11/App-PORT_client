import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

interface Props {
	id: string;
	img: string;
	title: string;
	description: string;
	author: string;
	userImg: string;
	userId: string;
}
const AppItem = (props: Props) => {
	const auth = useAppSelector((state) => state.auth);
	const { userId } = auth;
	const [isClicked, setIsClicked] = useState<boolean>(false);

	const clickHandler: React.MouseEventHandler = () => {
		setIsClicked((prev) => !prev);
	};
	return (
		<div className="shrink-0 snap-center w-full h-full flex items-center justify-center">
			<div
				className="w-full h-full max-w-[1024px] sm:max-h-[calc(100vh-20vh-70px-70px)] border bg-gray p-3 sm:rounded-md relative"
				onClick={clickHandler}
			>
				<img src={props.img} className="w-full h-full object-contain" />
				{isClicked && (
					<div className="absolute top-0 left-0 w-full h-full flex flex-col gap-5 justify-center items-center bg-black sm:rounded-md opacity-80">
						<div className="flex flex-col items-center gap-3 cursor-default">
							<h2 className="text-2xl lg:text-3xl font-bold">{props.title}</h2>
							<p className="px-32">{props.description}</p>
						</div>

						<div className="flex items-center gap-3">
							<img src={props.userImg} className="w-10 h-10 rounded-full" />
							<p className="cursor-default">created by {props.author}</p>
						</div>
						<div className="flex gap-5">
							<a
								href="https://github.com/stevesan11/"
								className="border px-12 py-2 rounded-lg"
							>
								Visit to Page
							</a>
							{userId === props.userId && (
								<Link to={`/app/${props.id}`} className="border p-2 rounded-lg">
									Edit App
								</Link>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default AppItem;
