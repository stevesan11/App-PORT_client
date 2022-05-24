import React, { useState } from "react";

import useAxios from "../../shared/hooks/axios-hook";

import { IResponseUsers } from "../../shared/types/DataModel";

import Modal from "../../components/UIElements/Modal";
import ErrorModal from "../../components/UIElements/ErrorModal";
import LoadingSpinner from "../../components/UIElements/LoadingSpinner";
import CardY from "../../components/UIElements/CardY";
import AppList from "../../components/app/AppList";
import DeleteApp from "../app/DeleteApp";

const User = () => {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [deleteAppData, setDeleteAppData] = useState({
		appId: "",
		title: "",
	});
	const { response, error, loading, clearError } = useAxios<IResponseUsers>(
		true,
		{
			method: "get",
			url: `${process.env.BACKEND_URL}/api/user`,
		}
	);

	const openModalHandler = (appId: string, title: string) => {
		setDeleteAppData({ appId, title });
		setModalIsOpen(true);
	};
	const closeModalHandler = () => {
		setDeleteAppData({ appId: "", title: "" });
		setModalIsOpen(false);
	};

	return (
		<>
			<ErrorModal show={!!error} onClose={clearError} message={error} />
			<Modal show={modalIsOpen} onClose={closeModalHandler}>
				<DeleteApp onClose={closeModalHandler} appData={deleteAppData} />
			</Modal>
			<CardY>
				{loading && !error && <LoadingSpinner />}
				{!loading &&
					!error &&
					response?.data.user &&
					response.data.user.map((user) => {
						if (user.apps.length === 0) return;
						return (
							<AppList
								key={user.username}
								user={{
									userId: user._id,
									username: user.username,
									userImg: user.image,
								}}
								items={user.apps}
								onDelete={openModalHandler}
							/>
						);
					})}
			</CardY>
		</>
	);
};

export default User;
