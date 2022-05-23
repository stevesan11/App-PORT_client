import React, { useEffect, useState } from "react";

import { useAppDispatch } from "../../shared/redux/hooks";
import { login } from "../../shared/redux/authSlice";
import useForm from "../../shared/hooks/form-hook";
import useAxios from "../../shared/hooks/axios-hook";

import {
	EmailValidator,
	MaxLengthValidator,
	MinLengthValidator,
	passwordValidator,
	RequireValidator,
	UsernameValidator,
} from "../../shared/utils/validators";

import { AuthFormInputs } from "../../shared/types/FormModel";
import { IResponseAuth } from "../../shared/types/DataModel";


import ErrorModal from "../../components/UIElements/ErrorModal";
import LoadingSpinner from "../../components/UIElements/LoadingSpinner";
import Button from "../../components/FormElement/Button";
import CancelButton from "../../components/FormElement/CancelButton";
import Input from "../../components/FormElement/Input";
import ImageUpload from "../../components/FormElement/ImageUpload";

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
	const { response, error, loading, sendRequest, clearError } =
		useAxios<IResponseAuth>(false);

	useEffect(() => {
		if (!response?.data.token || !response?.data.userId) return;
		dispatch(
			login({ userId: response.data.userId, token: response.data.token })
		);
		props.onClose();
	}, [response]);

	const modeChangeHandler: React.MouseEventHandler = () => {
		if (loginMode) {
			setFormDataHandler(
				{
					...formData.inputs,
					username: { value: "", isValid: false },
					image: { value: "", isValid: false },
				},
				false
			);
		} else if (!loginMode) {
			setFormDataHandler(
				{ ...formData.inputs, username: undefined, image: undefined },
				formData.inputs.email && formData.inputs.password.isValid
			);
			console.log(formData);
		}
		setLoginMode((prev) => !prev);
	};

	const submitHandler: React.FormEventHandler = async (e) => {
		e.preventDefault();
		const { email, password, username, image } = formData.inputs;

		if (loginMode) {
			try {
				await sendRequest({
					method: "post",
					url: `${process.env.DEV_URL}/api/user/login`,
					data: {
						email: email.value,
						password: password.value,
					},
				});
			} catch (error) {
				console.log(error);
			}
		}
		if (!loginMode) {
			if (!username?.value || !image?.value) {
				return;
			}
			const form = new FormData();
			form.append("username", username.value);
			form.append("email", email.value);
			form.append("password", password.value);
			form.append("image", image.value);
			try {
				await sendRequest({
					method: "post",
					url: `${process.env.DEV_URL}/api/user/signup`,
					data: form,
					headers: { "content-type": "multipart/form-data" },
				});
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<>
			<ErrorModal show={!!error} onClose={clearError} message={error} />
			{loading && !error && <LoadingSpinner />}
			<CancelButton onClose={props.onClose} />
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
					<>
						<ImageUpload<AuthFormInputs>
							inputId="image"
							styleType="signUp"
							onInput={inputHandler}
						/>
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
					</>
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
		</>
	);
};

export default Auth;
