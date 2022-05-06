export const RequireValidator = () => ({
	type: "Require",
});
export const UsernameValidator = () => ({
	type: "Username",
});
export const EmailValidator = () => ({
	type: "Email",
});
export const passwordValidator = () => ({
	type: "Password",
});
export const NewAppFormValidator = () => ({
	type: "NewApp",
});
export const MinLengthValidator = (val: number) => ({
	type: "MinLength",
	val,
});
export const MaxLengthValidator = (val: number) => ({
	type: "MaxLength",
	val,
});

const checkValid = (
	value: string,
	validators: { type: string; val?: number }[]
) => {
	let isValid = true;
	for (const validator of validators) {
		if (validator.type === "Require") {
			isValid = isValid && value.trim().length > 0;
		}
		if (validator.type === "Username") {
			isValid = isValid && /^\w*$/.test(value);
		}
		if (validator.type === "Email") {
			isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
		}
		if (validator.type === "Password") {
			isValid = isValid && /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])\w*$/.test(value);
		}
		if (validator.type === "NewApp") {
			isValid = isValid && /^.*$/.test(value);
		}
		if (validator.type === "MinLength") {
			if (!validator.val) {
				throw new Error("parametor is undefined");
			}
			isValid = isValid && value.trim().length >= validator.val;
		}
		if (validator.type === "MaxLength") {
			if (!validator.val) {
				throw new Error("parametor is undefined");
			}
			isValid = isValid && value.trim().length <= validator.val;
		}
	}
	return isValid;
};

export default checkValid;
