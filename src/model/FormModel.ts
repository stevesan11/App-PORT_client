export interface FormData {
	inputs: FormInputs;
	formIsValid: boolean;
}

export interface FormInputs {
	username?: {
		value: string;
		isValid: boolean;
	};
	email: {
		value: string;
		isValid: boolean;
	};
	password: {
		value: string;
		isValid: boolean;
	};
}
