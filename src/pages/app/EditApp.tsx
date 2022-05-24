import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAppSelector } from "../../shared/redux/hooks";
import useAxios from "../../shared/hooks/axios-hook";
import useForm from "../../shared/hooks/form-hook";
import {
	RequireValidator,
	MinLengthValidator,
	MaxLengthValidator,
	NewAppFormValidator,
	UrlValidator,
} from "../../shared/utils/validators";

import { AppFormInputs } from "../../shared/types/FormModel";
import { IResponseApp } from "../../shared/types/DataModel";

import ErrorModal from "../../components/UIElements/ErrorModal";
import LoadingSpinner from "../../components/UIElements/LoadingSpinner";
import Button from "../../components/FormElement/Button";
import Input from "../../components/FormElement/Input";
import ImageUpload from "../../components/FormElement/ImageUpload";

const EditApp = () => {
	const appId = useParams().appId;
	const navigate = useNavigate();
	const auth = useAppSelector((state) => state.auth);
	const { userId, token } = auth;
	const { formData, inputHandler, setFormDataHandler } = useForm<AppFormInputs>(
		{
			image: { value: "", isValid: false },
			title: { value: "", isValid: false },
			description: { value: "", isValid: false },
			url: { value: "", isValid: false },
		},
		false
	);
	const { response, error, loading, sendRequest, clearError } =
		useAxios<IResponseApp>(true, {
			method: "get",
			url: `${process.env.BACKEND_URL}/api/app/${appId}`,
		});

	useEffect(() => {
		if (!response?.data.app) return;
		const { image, title, description, url } = response.data.app;
		setFormDataHandler(
			{
				image: { value: image, isValid: true },
				title: { value: title, isValid: true },
				description: { value: description, isValid: true },
				url: { value: url, isValid: true },
			},
			true
		);
	}, [response]);

	const submitHandler: React.FormEventHandler = async (e) => {
		e.preventDefault();
		const { image, title, description, url } = formData.inputs;
		const form = new FormData();
		form.append("image", image.value);
		form.append("title", title.value);
		form.append("description", description.value);
		form.append("url", url.value);
		form.append("author", userId);
		try {
			await sendRequest({
				method: "patch",
				url: `${process.env.BACKEND_URL}/api/app/${appId}`,
				data: form,
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
			<div className="w-screen h-[calc(100vh-70px-70px)]">
				<div className="w-full h-full flex items-center justify-center text-center">
					<div className="w-full h-full max-w-[1024px] sm:max-h-[calc(100vh-20vh-70px-70px)] gap-5 p-10 sm:rounded-lg  bg-gray text-maroon overflow-auto">
						{loading && !error && <LoadingSpinner />}
						<h2 className="text-2xl lg:text-3xl font-bold">Edit App</h2>
						<hr className="my-3" />
						{response?.data.app && (
							<form className="text-lg lg:text-xl" onSubmit={submitHandler}>
								<ImageUpload<AppFormInputs>
									inputId="image"
									onInput={inputHandler}
									initialImg={response.data.app.image}
									initialValid={true}
								/>
								<Input<AppFormInputs>
									label="Title"
									inputId="title"
									type="text"
									placeholder="App_PORT"
									errorText="please enter a valid title(3-30 characters)"
									onInput={inputHandler}
									validators={[
										RequireValidator(),
										NewAppFormValidator(),
										MinLengthValidator(3),
										MaxLengthValidator(30),
									]}
									initialValue={response.data.app.title}
									initialValid={true}
								/>
								<Input<AppFormInputs>
									label="Description"
									inputId="description"
									type="text"
									placeholder="This is My Portfolio"
									errorText="please enter a valid description(10-300 characters)"
									onInput={inputHandler}
									validators={[
										RequireValidator(),
										NewAppFormValidator(),
										MinLengthValidator(10),
										MaxLengthValidator(300),
									]}
									textarea={{ rows: 8 }}
									initialValue={response.data.app.description}
									initialValid={true}
								/>
								<Input<AppFormInputs>
									label="URL"
									inputId="url"
									type="url"
									placeholder="https://example.com"
									errorText="please enter a valid url"
									onInput={inputHandler}
									validators={[
										RequireValidator(),
										UrlValidator(),
										MinLengthValidator(13),
										MaxLengthValidator(2083),
									]}
									initialValue={response.data.app.url}
									initialValid={true}
								/>
								<Button
									type="submit"
									btnStyle="submit_btn"
									disabled={!formData.formIsValid}
								>
									SUBMIT
								</Button>
							</form>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default EditApp;
