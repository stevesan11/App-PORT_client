import React, { useEffect, useState } from "react";

import { FormInputs } from "../../../model/FormModel";

interface Props {
	label: string;
	inputId: string;
	type: string;
	errorText: string;
	onInput: (key: keyof FormInputs, value: string, isValid: boolean) => void;
}
const Input = (props: Props) => {
	const [formValue, setFormValue] = useState({
		value: "",
		isValid: false,
	});
	const [isTouched, setIsTouched] = useState(false);

	const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		const { target } = e;
		setFormValue((prevValue) => {
			const inputIsvalid = target.value.length > 8;
			return { ...prevValue, value: target.value, isValid: inputIsvalid };
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
