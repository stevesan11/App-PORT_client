import React, { useState } from "react";

import Cancel from "../../images/cancel_FILL0_wght400_GRAD0_opsz48.svg";

import {
	EmailValidator,
	MaxLengthValidator,
	MinLengthValidator,
	passwordValidator,
	RequireValidator,
	UsernameValidator,
} from "../../shared/utils/validators";
import { useAppDispatch } from "../../redux/hooks";
import useForm from "../../shared/hooks/form-hook";

import Button from "../../shared/components/FormElement/Button";
import Input from "../../shared/components/FormElement/Input";
import Modal from "../../shared/components/UIElements/Modal";
import { login } from "../../redux/authSlice";
import { AuthFormInputs } from "../../model/FormModel";

interface User {
	username: string;
	email: string;
	password: string;
}
const users: User[] = [
	{
		username: "Suzuki",
		email: "test@test.com",
		password: "Qwe123123",
	},
	{
		username: "Yuki",
		email: "test1@test.com",
		password: "Qwe123123",
	},
];

interface Props {
	onClose: () => void;
}
const Auth = (props: Props) => {
	const dispatch = useAppDispatch();
	const [loginMode, setLoginMode] = useState<boolean>(true);
	const { formData, inputHandler, setFormDataHandler } =
		useForm<AuthFormInputs>(
			{
				email: { value: "", isValid: false },
				password: { value: "", isValid: false },
			},
			false
		);

	const modeChangeHandler = () => {
		if (loginMode) {
			setFormDataHandler(
				{
					...formData.inputs,
					username: { value: "", isValid: false },
				},
				false
			);
		} else if (!loginMode) {
			setFormDataHandler(
				{ ...formData.inputs, username: undefined },
				formData.inputs.email && formData.inputs.password.isValid
			);
			console.log(formData);
		}
		setLoginMode((prev) => !prev);
	};

	const submitHandler: React.FormEventHandler = (e) => {
		e.preventDefault();

		if (loginMode) {
			const user: User | undefined = users.find(
				(user) => user.email === formData.inputs.email.value
			);
			if (!user) {
				throw new Error("Cannnot find user");
			} else {
				if (user.password === formData.inputs.password.value) {
					dispatch(login(formData.inputs.email.value));
					props.onClose();
				} else {
					throw new Error("entered password is invalid");
				}
			}
		}
		if (!loginMode) {
			if (!formData.inputs.username?.value) {
				throw new Error("Please eneter your username");
			} else {
				users.push({
					username: formData.inputs.username.value,
					email: formData.inputs.email.value,
					password: formData.inputs.password.value,
				});
				dispatch(login(formData.inputs.email.value));
				props.onClose();
			}
		}
	};

	return (
		<Modal show={true} onClose={props.onClose}>
			<button className="block mr-auto scale-50" onClick={props.onClose}>
				<Cancel className="fill-black hover:opacity-30" />
			</button>
			<div className="flex justify-between items-center sm:px-10">
				<h2 className="text-2xl lg:text-3xl font-bold ">
					{loginMode ? "Login" : "Register"}
				</h2>
				<Button type="button" btnStyle="switch_btn" onClick={modeChangeHandler}>
					{loginMode ? "→ Register" : "→ Login"}
				</Button>
			</div>
			<hr className="my-3" />
			<form onSubmit={submitHandler}>
				{!loginMode && (
					<Input<AuthFormInputs>
						label="Username"
						inputId="username"
						type="text"
						autoComplete="username"
						placeholder="app_port"
						errorText="please enter a valid username(3-20 characters a-zA-Z_0-9)"
						onInput={inputHandler}
						validators={[
							RequireValidator(),
							UsernameValidator(),
							MinLengthValidator(3),
							MaxLengthValidator(20),
						]}
					/>
				)}
				<Input<AuthFormInputs>
					label="E-Mail"
					inputId="email"
					type="email"
					autoComplete="email"
					placeholder="app_port@xyz.com"
					errorText="Please enter a valid email"
					onInput={inputHandler}
					validators={[
						RequireValidator(),
						EmailValidator(),
						MinLengthValidator(6),
						MaxLengthValidator(320),
					]}
				/>
				<Input<AuthFormInputs>
					label="Password"
					inputId="password"
					type="password"
					autoComplete="new-password"
					placeholder="････････"
					errorText="At least one uppercase letter, one lowercase letter, and one number.(8-30 characters,)"
					onInput={inputHandler}
					validators={[
						RequireValidator(),
						passwordValidator(),
						MinLengthValidator(8),
						MaxLengthValidator(20),
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
		</Modal>
	);
};

export default Auth;
