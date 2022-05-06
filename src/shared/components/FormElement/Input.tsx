import React, { useEffect, useState } from "react";

import checkValid from "../../utils/validators";

interface Props<T> {
	label: string;
	inputId: string;
	type?: string;
	autoComplete?: string;
	errorText: string;
	placeholder?: string;
	onInput: (id: keyof T, value: string, isValid: boolean) => void;
	validators: { type: string; val?: number }[];
	textarea?: { rows?: number; cols?: number };
	initialValue?: string;
	initialValid?: boolean;
}
const Input = <T,>(props: Props<T>) => {
	const [formValue, setFormValue] = useState({
		value: props.initialValue || "",
		isValid: props.initialValid || false,
	});
	const [isTouched, setIsTouched] = useState(false);

	const changeHandler: React.ChangeEventHandler<
		HTMLInputElement | HTMLTextAreaElement
	> = (e) => {
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
		props.onInput(props.inputId as keyof T, formValue.value, formValue.isValid);
	}, [props.onInput, props.inputId, formValue]);

	const inputType = props.textarea ? (
		<textarea
			id={props.inputId}
			autoComplete={props.autoComplete}
			placeholder={props.placeholder}
			className="w-full max-w-sm p-1 resize-none"
			onChange={changeHandler}
			onBlur={touchHandler}
			value={formValue.value}
			rows={props.textarea.rows}
			cols={props.textarea.cols}
		/>
	) : (
		<input
			id={props.inputId}
			type={props.type}
			autoComplete={props.autoComplete}
			placeholder={props.placeholder}
			className="w-full max-w-sm p-1"
			onChange={changeHandler}
			onBlur={touchHandler}
			value={formValue.value}
		/>
	);

	return (
		<div className="mb-5">
			<label htmlFor={props.inputId} className="block mb-3 font-bold">
				{props.label}
			</label>
			{inputType}
			{isTouched && !formValue.isValid && (
				<p className="text-maroon">{props.errorText}</p>
			)}
		</div>
	);
};

export default Input;
