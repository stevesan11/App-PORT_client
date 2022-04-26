import React, { useCallback, useState } from "react";

import { FormData } from "../../model/FormModel";
import { FormInputs } from "../../model/FormModel";

import Button from "../../shared/components/FormElement/Button";
import Input from "../../shared/components/FormElement/Input";

// const DUMMY_USER = [
// 	{
// 		id: "u1",
// 		name: "Suzuki",
//    age: 19,
// 		img: "https://1.bp.blogspot.com/-MSYFq6uM-ww/VXOUV6tj7CI/AAAAAAAAuJw/1J3IBYHAGJ8/s400/iede_boy.png",
// 		email: "test@test.com",
// 		password: "123qwe",
// 		app: [],
// 	},
// 	{
// 		id: "u2",
// 		name: "Yuki",
//    age: 19,
// 		img: "https://1.bp.blogspot.com/-MSYFq6uM-ww/VXOUV6tj7CI/AAAAAAAAuJw/1J3IBYHAGJ8/s400/iede_boy.png",
// 		email: "test2@test.com",
// 		password: "123qwe",
// 		app: [],
// 	},
// ];

const Auth = () => {
	const [formData, setFormData] = useState<FormData>({
		inputs: {
			username: {
				value: "",
				isValid: false,
			},
			email: {
				value: "",
				isValid: false,
			},
			password: {
				value: "",
				isValid: false,
			},
		},
		formIsValid: false,
	});

	const inputHandler = useCallback(
		(id: keyof FormInputs, value: string, isValid: boolean) => {
			let formIsValid = true;
			setFormData((prev) => {
				for (const key in prev.inputs) {
					if (key === id) {
						formIsValid = formIsValid && isValid;
					} else {
						formIsValid =
							formIsValid && prev.inputs[key as keyof FormInputs].isValid;
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

	console.log(formData);

	return (
		<div className="top-[calc(100vh-70px)]">
			<div className="flex justify-center align-middle text-center">
				<div className="sm:mt-[150px] w-screen max-w-[640px] sm:max-h-[calc(100vh-70px-20vh)] p-10 bg-gray text-black sm:rounded-lg">
					<h2 className="text-3xl font-bold">Sign Up</h2>
					<hr className="my-3" />
					<form>
						<Input
							label="Username"
							inputId="username"
							type="text"
							onInput={inputHandler}
							errorText="Please enter valid name"
						/>
						<Input
							label="E-Mail"
							inputId="email"
							type="email"
							onInput={inputHandler}
							errorText="Please enter valid email"
						/>
						<Input
							label="Password"
							inputId="password"
							type="password"
							onInput={inputHandler}
							errorText="Please enter valid password"
						/>
						<Button type="button" disabled={formData.formIsValid}>
							Sign Up
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Auth;
