import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../../shared/redux/hooks";
import useForm from "../../shared/hooks/form-hook";
import useAxios from "../../shared/hooks/axios-hook";
import {
	DeleteAppFormValidator,
	MaxLengthValidator,
	MinLengthValidator,
	RequireValidator,
} from "../../shared/utils/validators";

import { DeleteAppFormInputs } from "../../shared/types/FormModel";
import { IResponseApp } from "../../shared/types/DataModel";

import ErrorModal from "../../components/UIElements/ErrorModal";
import LoadingSpinner from "../../components/UIElements/LoadingSpinner";
import Button from "../../components/FormElement/Button";
import CancelButton from "../../components/FormElement/CancelButton";
import Input from "../../components/FormElement/Input";

interface Props {
	appData: {
		appId: string;
		title: string;
	};
	onClose: () => void;
}
const DeleteApp = (props: Props) => {
	const navigate = useNavigate();
	const auth = useAppSelector((state) => state.auth);
	const { userId, token } = auth;
	const { appId, title } = props.appData;
	const { formData, inputHandler } = useForm<DeleteAppFormInputs>(
		{
			title: { value: "", isValid: false },
		},
		false
	);
	const { response, error, loading, sendRequest, clearError } =
		useAxios<IResponseApp>(false);

	console.log(response, error, loading);

	useEffect(() => {
		if (!response?.data.app) return;
		props.onClose();
	}, [response]);

	const submitHandler: React.FormEventHandler = async (e) => {
		e.preventDefault();
		try {
			await sendRequest({
				method: "delete",
				url: `${process.env.DEV_URL}/api/app/${appId}`,
				headers: { Authorization: `Bearer ${token}` },
			});
			navigate(`/${userId}/app`, { replace: true });
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<ErrorModal show={!!error} onClose={clearError} message={error} />
			{loading && !error && <LoadingSpinner />}
			<div className="flex justify-start items-center sm:px-10">
				<CancelButton onClose={props.onClose} />
				<h2 className="text-lg lg:text-xl font-bold ">DELETE APP</h2>
			</div>
			<hr className="my-2" />
			<form className="text-sm lg:text-md" onSubmit={submitHandler}>
				<Input<DeleteAppFormInputs>
					label={`To delete the ${title}, type the name to confirm.`}
					inputId="title"
					type="text"
					inputSize="sm"
					errorText="please enter a valid title"
					onInput={inputHandler}
					validators={[
						RequireValidator(),
						DeleteAppFormValidator(title),
						MinLengthValidator(3),
						MaxLengthValidator(30),
					]}
				/>
				<div className="flex justify-center gap-3">
					<Button
						type="button"
						btnStyle="cancel_btn"
						btnSize="sm"
						onClick={props.onClose}
					>
						CANCEL
					</Button>
					<Button
						type="submit"
						btnStyle="submit_btn"
						btnSize="sm"
						disabled={!formData.formIsValid}
					>
						SUBMIT
					</Button>
				</div>
			</form>
		</>
	);
};

export default DeleteApp;
