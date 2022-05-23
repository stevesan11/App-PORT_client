import React from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../../shared/redux/hooks";
import useForm from "../../shared/hooks/form-hook";
import useAxios from "../../shared/hooks/axios-hook";
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

const NewApp = () => {
	const auth = useAppSelector((state) => state.auth);
	const { userId, token } = auth;
	const navigate = useNavigate();
	const { formData, inputHandler } = useForm<AppFormInputs>(
		{
			title: { value: "", isValid: false },
			description: { value: "", isValid: false },
			url: { value: "", isValid: false },
			image: { value: "", isValid: false },
		},
		false
	);
	const { error, loading, sendRequest, clearError } =
		useAxios<IResponseApp>(false);

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
				method: "post",
				url: `${process.env.DEV_URL}/api/app/`,
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
						{!error && loading && <LoadingSpinner />}
						<h2 className="text-2xl lg:text-3xl font-bold">Add New App</h2>
						<hr className="my-3" />
						<form className="text-lg lg:text-xl" onSubmit={submitHandler}>
							<ImageUpload<AppFormInputs>
								inputId="image"
								onInput={inputHandler}
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
							/>
							<Button
								type="submit"
								btnStyle="submit_btn"
								disabled={!formData.formIsValid}
							>
								SUBMIT
							</Button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default NewApp;
