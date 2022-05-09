import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useForm from "../../shared/hooks/form-hook";
import {
	RequireValidator,
	MinLengthValidator,
	MaxLengthValidator,
	NewAppFormValidator,
} from "../../shared/utils/validators";

import { AppData, AppFormInputs } from "../../model/FormModel";

import Input from "../../shared/components/FormElement/Input";
import Button from "../../shared/components/FormElement/Button";

import ImageUpload from "../../shared/components/FormElement/ImageUpload";

import { userList, appList } from "../../DUMMY/DUMMY_DATA";
import { useAppSelector } from "../../redux/hooks";

const EditApp = () => {
	const auth = useAppSelector((state) => state.auth);
	const { userId } = auth;
	const appId = useParams().appId;
	const navigate = useNavigate();

	const [loadedApp, setLoadedApp] = useState<AppData>();
	const { formData, inputHandler } = useForm<AppFormInputs>(
		{
			image: { value: loadedApp?.image || "", isValid: true },
			title: { value: loadedApp?.title || "", isValid: true },
			description: { value: loadedApp?.description || "", isValid: true },
			url: { value: loadedApp?.title || "", isValid: true },
		},
		true
	);

	useEffect(() => {
		const fetchApp = () => {
			const editApp = appList.find((app) => app.id === appId);
			if (!editApp) {
				throw new Error("Not found that app");
			}
			setLoadedApp(editApp);
		};
		fetchApp();
	}, [appId]);

	console.log(loadedApp, formData);

	const submitHandler: React.FormEventHandler = (e) => {
		e.preventDefault();
		const editedApp = {
			id: Math.random().toString(),
			image: formData.inputs.image.value,
			title: formData.inputs.title.value,
			description: formData.inputs.description.value,
			url: formData.inputs.url.value,
			author: userId,
		};
		const editAppIndex = appList.findIndex((app) => app.id === appId);
		const userIndex = userList.findIndex((user) => user.email === userId);
		const userAppIndex = userList[userIndex].apps.findIndex(
			(app) => app.id === appId
		);
		appList[editAppIndex] = editedApp;
		userList[userIndex].apps[userAppIndex] = editedApp;
		navigate("/");
	};

	return (
		<div className="w-screen h-[calc(100vh-70px-70px)]">
			<div className="w-full h-full flex items-center justify-center text-center">
				<div className="w-full h-full max-w-[1024px] sm:max-h-[calc(100vh-20vh-70px-70px)] gap-5 p-10 sm:rounded-lg  bg-gray text-maroon overflow-auto">
					<h2 className="text-2xl lg:text-3xl font-bold">Edit App</h2>
					<hr className="my-3" />
					{loadedApp && (
						<form className="text-lg lg:text-xl" onSubmit={submitHandler}>
							<ImageUpload<AppFormInputs>
								inputId="image"
								onInput={inputHandler}
								initialImg={loadedApp.image}
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
								initialValue={loadedApp.title}
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
								initialValue={loadedApp.description}
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
	);
};

export default EditApp;
