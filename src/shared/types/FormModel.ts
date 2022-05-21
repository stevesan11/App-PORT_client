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

export interface DeleteAppFormInputs {
	title: {
		value: string;
		isValid: boolean;
	};
}
