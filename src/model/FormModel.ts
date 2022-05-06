export interface AuthFormData {
	inputs: AuthFormInputs;
	formIsValid: boolean;
}

export interface AuthFormInputs {
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

export interface AppFormData {
	inputs: AppFormInputs;
	formIsValid: boolean;
}

export interface AppFormInputs {
	title: {
		value: string;
		isValid: boolean;
	};
	description: {
		value: string;
		isValid: boolean;
	};
}
