import React from "react";

import useForm from "../../shared/hooks/form-hook";
import {
	RequireValidator,
	MinLengthValidator,
	MaxLengthValidator,
	NewAppFormValidator,
} from "../../shared/utils/validators";

import { AppFormInputs } from "../../model/FormModel";

import Input from "../../shared/components/FormElement/Input";
import Button from "../../shared/components/FormElement/Button";

const NewApp = () => {
	const { formData, inputHandler } = useForm<AppFormInputs>(
		{
			title: { value: "", isValid: false },
			description: { value: "", isValid: false },
		},
		false
	);

	const submitHandler: React.FormEventHandler = (e) => {
		e.preventDefault();
		console.log(formData);
	};

	return (
		<div className="w-screen h-[calc(100vh-70px-70px)]">
			<div className="w-full h-full flex items-center justify-center text-center">
				<div className="w-full h-full max-w-[1024px] sm:max-h-[calc(100vh-20vh-70px-70px)] gap-5 p-10 sm:rounded-lg  bg-gray text-maroon overflow-auto">
					<h2 className="text-2xl lg:text-3xl font-bold">Add New App</h2>
					<hr className="my-3" />
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
