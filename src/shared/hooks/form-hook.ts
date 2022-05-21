import { useState, useCallback } from "react";

const useForm = <T>(initialState: T, initialValidity: boolean) => {
	const [formData, setFormData] = useState({
		inputs: initialState,
		formIsValid: initialValidity,
	});

	const inputHandler = useCallback(
		(id: keyof T, value: string | File, isValid: boolean) => {
			let formIsValid = true;
			setFormData((prev) => {
				for (const [key, value] of Object.entries(prev.inputs)) {
					if (!value) {
						continue;
					}
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
	const setFormDataHandler = useCallback(
		(formInputs: T, formValidity: boolean) => {
			setFormData((prev) => {
				return {
					...prev,
					inputs: formInputs,
					formIsValid: formValidity,
				};
			});
		},
		[]
	);

	return { formData, inputHandler, setFormDataHandler };
};

export default useForm;
