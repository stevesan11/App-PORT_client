import React, { useCallback, useState } from "react";

import Cancel from "../../images/cancel_FILL0_wght400_GRAD0_opsz48.svg";

import { FormData } from "../../model/FormModel";
import { FormInputs } from "../../model/FormModel";

import {
	EmailValidator,
	MaxLengthValidator,
	MinLengthValidator,
	passwordValidator,
	RequireValidator,
	UsernameValidator,
} from "../../utils/validators";

import Button from "../../shared/components/FormElement/Button";
import Input from "../../shared/components/FormElement/Input";
import Modal from "../../shared/components/UIElements/Modal";

interface Props {
	onClose: React.MouseEventHandler<Element>;
}
const Auth = (props: Props) => {
	const [loginMode, setLoginMode] = useState<boolean>(true);
	const [formData, setFormData] = useState<FormData>({
		inputs: {
			email: { value: "", isValid: false },
			password: { value: "", isValid: false },
		},
		formIsValid: false,
	});

	const modeChangeHandler = () => {
		if (loginMode) {
			setFormData((prev) => {
				return {
					...prev,
					inputs: { ...prev.inputs, username: undefined },
					formIsValid: false,
				};
			});
		}
		if (!loginMode) {
			setFormData((prev) => {
				return {
					...prev,
					inputs: { ...prev.inputs, username: { value: "", isValid: false } },
					formIsValid:
						prev.inputs.email.isValid && prev.inputs.password.isValid,
				};
			});
		}
		setLoginMode((prev) => !prev);
	};

	const inputHandler = useCallback(
		(id: keyof FormInputs, value: string, isValid: boolean) => {
			let formIsValid = true;
			setFormData((prev) => {
				for (const [key, value] of Object.entries(prev.inputs)) {
					if (key === id) {
						formIsValid = formIsValid && isValid;
					} else {
						formIsValid = formIsValid && value.isValid;
					}
				}

				return {
					...prev,
					inputs: {
						...prev.inputs,
						[id]: { value: value, isValid: isValid },
					},
					formIsValid: formIsValid,
				};
			});
		},
		[]
	);

	const submitHandler: React.FormEventHandler = (e) => {
		e.preventDefault();
		console.log(formData);
	};

	return (
		<Modal show={true}>
			<button className="block mr-auto" onClick={props.onClose}>
				<Cancel className="scale-50 fill-black hover:opacity-30" />
			</button>
			<div className="flex justify-between items-center px-10">
				<h2 className="text-3xl font-bold">
					{loginMode ? "Login" : "Register"}
				</h2>
				<Button type="button" btnStyle="switch_btn" onClick={modeChangeHandler}>
					{loginMode ? "→ Register" : "→ Login"}
				</Button>
			</div>
			<hr className="my-3" />
			<form onSubmit={submitHandler}>
				{!loginMode && (
					<Input
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
				<Input
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
				<Input
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
