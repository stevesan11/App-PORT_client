import React from "react";

import useForm from "../../shared/hooks/form-hook";
import {
	RequireValidator,
	MinLengthValidator,
	MaxLengthValidator,
	NewAppFormValidator,
	UrlValidator,
} from "../../shared/utils/validators";

import { AppData, AppFormInputs } from "../../model/FormModel";

import Input from "../../shared/components/FormElement/Input";
import Button from "../../shared/components/FormElement/Button";
import ImageUpload from "../../shared/components/FormElement/ImageUpload";

import { userList, appList } from "../../DUMMY/DUMMY_DATA";
import { useAppSelector } from "../../redux/hooks";

const NewApp = () => {
	const auth = useAppSelector((state) => state.auth);
	const { userId } = auth;
	const { formData, inputHandler } = useForm<AppFormInputs>(
		{
			title: { value: "", isValid: false },
			description: { value: "", isValid: false },
			url: { value: "", isValid: false },
			image: { value: "", isValid: false },
		},
		false
	);

	const submitHandler: React.FormEventHandler = (e) => {
		e.preventDefault();
		const appData: AppData = {
			id: Math.random().toString(),
			title: formData.inputs.title.value,
			description: formData.inputs.description.value,
			image: formData.inputs.image.value,
			url: formData.inputs.url.value,
			author: userId,
		};
		const user = userList.find((user) => user.email === userId);
		if (!user) {
			return;
		}
		user.apps.push(appData);
		appList.push(appData);
	};

	return (
		<div className="w-screen h-[calc(100vh-70px-70px)]">
			<div className="w-full h-full flex items-center justify-center text-center">
				<div className="w-full h-full max-w-[1024px] sm:max-h-[calc(100vh-20vh-70px-70px)] gap-5 p-10 sm:rounded-lg  bg-gray text-maroon overflow-auto">
					<h2 className="text-2xl lg:text-3xl font-bold">Add New App</h2>
					<hr className="my-3" />
					<form className="text-lg lg:text-xl" onSubmit={submitHandler}>
						<ImageUpload<AppFormInputs>
							inputId="image"
							styleType="newForm"
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
	);
};

export default NewApp;
