import React, { useState } from "react";

import { useAppSelector } from "../../shared/redux/hooks";
import useAxios from "../../shared/hooks/axios-hook";

import { IResponseUser } from "../../shared/types/DataModel";

import ErrorModal from "../../components/UIElements/ErrorModal";
import Modal from "../../components/UIElements/Modal";
import LoadingSpinner from "../../components/UIElements/LoadingSpinner";
import AppList from "../../components/app/AppList";
import DeleteApp from "./DeleteApp";

const Myapp = () => {
	const auth = useAppSelector((state) => state.auth);
	const { userId } = auth;
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [deleteAppData, setDeleteAppData] = useState({
		appId: "",
		title: "",
	});
	const { response, error, loading, clearError } = useAxios<IResponseUser>(
		true,
		{
			method: "get",
			url: `${process.env.DEV_URL}/api/app/user/${userId}`,
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
			<div className="w-screen h-[calc(100vh-70px-70px)] flex">
				{loading && !error && <LoadingSpinner />}
				{!loading && !error && response?.data.user && (
					<AppList
						key={response.data.user.username}
						user={{
							userId: response.data.user._id,
							username: response.data.user.username,
							userImg: response.data.user.image,
						}}
						items={response.data.user.apps}
						onDelete={openModalHandler}
					/>
				)}
			</div>
		</>
	);
};

export default Myapp;
