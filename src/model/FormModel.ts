export interface UserData {
	id: string;
	image: string;
	username: string;
	email: string;
	password: string;
	apps: AppData[];
}

export interface AuthFormData {
	inputs: AuthFormInputs;
	formIsValid: boolean;
}

export interface AuthFormInputs {
	image?: {
		value: string;
		isValid: boolean;
	};
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

export interface AppData {
	id: string;
	title: string;
	description: string;
	image: string;
	url: string;
	author: string;
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
	url: {
		value: string;
		isValid: boolean;
	};
	image: {
		value: string;
		isValid: boolean;
	};
}
