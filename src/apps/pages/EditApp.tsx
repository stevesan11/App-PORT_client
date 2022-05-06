import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useForm from "../../shared/hooks/form-hook";
import {
	RequireValidator,
	MinLengthValidator,
	MaxLengthValidator,
	NewAppFormValidator,
} from "../../shared/utils/validators";

import { AppFormData, AppFormInputs } from "../../model/FormModel";

import Input from "../../shared/components/FormElement/Input";
import Button from "../../shared/components/FormElement/Button";

import Image1 from "../../images/Screen Shot 2022-04-29 at 12.19.55.png";
import Image2 from "../../images/Screen Shot 2022-05-02 at 10.49.32.png";
import Image3 from "../../images/images3.jpeg";
import Image4 from "../../images/building_takoyaki_yatai.png";

const DUMMY_APP = [
	{
		id: "t1",
		title: "test app",
		description: "this is a test",
		img: Image1,
		url: "https://github.com/stevesan11/",
		author: {
			username: "Suzuki",
			email: "test@test.com",
			password: "Qwe12321",
			img: Image3,
		},
	},
	{
		id: "t2",
		title: "test app",
		description: "this is a test",
		img: Image2,
		url: "https://github.com/stevesan11/",
		author: {
			username: "Suzuki",
			email: "test@test.com",
			password: "Qwe12321",
			img: Image3,
		},
	},
	{
		id: "t3",
		title: "test app",
		description: "this is a test",
		img: Image1,
		url: "https://github.com/stevesan11/",
		author: {
			id: "u2",
			username: "Yuki",
			email: "test1@test.com",
			password: "Qwe123123",
			img: Image4,
		},
	},
	{
		id: "t4",
		title: "test app",
		description: "this is a test",
		img: Image2,
		url: "https://github.com/stevesan11/",
		author: {
			id: "u2",
			username: "Yuki",
			email: "test1@test.com",
			password: "Qwe123123",
			img: Image4,
		},
	},
];

const EditApp = () => {
	const appId = useParams().appId;
	const [loadedApp, setLoadedApp] = useState<AppFormData>();
	const { formData, inputHandler, setFormDataHandler } = useForm<AppFormInputs>(
		{
			title: { value: "hello", isValid: false },
			description: { value: "test is test", isValid: false },
		},
		false
	);

	useEffect(() => {
		const fetchApp = () => {
			const resultApp = DUMMY_APP.find((app) => app.id === appId);
			if (!resultApp) {
				throw new Error("Not found that app");
			}
			setLoadedApp({
				inputs: {
					title: { value: resultApp.title, isValid: true },
					description: { value: resultApp.description, isValid: true },
				},
				formIsValid: true,
			});
			setFormDataHandler(
				{
					title: { value: resultApp.title, isValid: true },
					description: { value: resultApp.description, isValid: true },
				},
				true
			);
		};
		fetchApp();
	}, [setFormDataHandler, appId]);

	const submitHandler: React.FormEventHandler = (e) => {
		e.preventDefault();
		console.log(formData);
	};

	return (
		<div className="w-screen h-[calc(100vh-70px-70px)]">
			<div className="w-full h-full flex items-center justify-center text-center">
				<div className="w-full h-full max-w-[1024px] sm:max-h-[calc(100vh-20vh-70px-70px)] gap-5 p-10 sm:rounded-lg  bg-gray text-maroon overflow-auto">
					<h2 className="text-2xl lg:text-3xl font-bold">Edit App</h2>
					<hr className="my-3" />
					{loadedApp && (
						<form className="text-lg lg:text-xl" onSubmit={submitHandler}>
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
								initialValue={loadedApp.inputs.title.value}
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
								initialValue={loadedApp.inputs.description.value}
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
