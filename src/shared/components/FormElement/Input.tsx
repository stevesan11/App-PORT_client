import React, { useEffect, useState } from "react";

import { FormInputs } from "../../../model/FormModel";
import checkValid from "../../../utils/validators";

interface Props {
	label: string;
	inputId: string;
	type: string;
	autoComplete: string;
	errorText: string;
	placeholder?: string;
	onInput: (key: keyof FormInputs, value: string, isValid: boolean) => void;
	validators: { type: string; val?: number }[];
}
const Input = (props: Props) => {
	const [formValue, setFormValue] = useState({
		value: "",
		isValid: false,
	});
	const [isTouched, setIsTouched] = useState(false);

	const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		const { target } = e;
		const isValid = checkValid(target.value, props.validators);
		setFormValue((prevValue) => {
			return { ...prevValue, value: target.value, isValid: isValid };
		});
	};

	const touchHandler: React.FocusEventHandler = () => {
		setIsTouched(true);
	};

	useEffect(() => {
		props.onInput(
			props.inputId as keyof FormInputs,
			formValue.value,
			formValue.isValid
		);
	}, [props.onInput, props.inputId, formValue]);

	return (
		<div className="mb-5">
			<label htmlFor={props.inputId} className="block mb-3 font-bold">
				{props.label}
			</label>
			<input
				id={props.inputId}
				type={props.type}
				autoComplete={props.autoComplete}
				placeholder={props.placeholder}
				className="w-1/2 p-1"
				onChange={changeHandler}
				onBlur={touchHandler}
				value={formValue.value}
			/>
			{isTouched && !formValue.isValid && (
				<p className="text-red-500">{props.errorText}</p>
			)}
		</div>
	);
};

export default Input;
