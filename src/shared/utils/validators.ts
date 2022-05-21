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
export const DeleteAppFormValidator = (val: string) => ({
	type: "DeleteApp",
	val,
});
export const UrlValidator = () => ({
	type: "Url",
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
	validators: { type: string; val?: string | number }[]
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
		if (validator.type === "DeleteApp") {
			if (!validator.val || typeof validator.val !== "string")
				throw new Error("parametor is undefined");
			isValid = isValid && value === validator.val;
		}
		if (validator.type === "Url") {
			isValid =
				isValid &&
				/https?:\/\/[-_.!~*'()a-zA-Z0-9;/?:@&=+$,%#\u3000-\u30FE\u4E00-\u9FA0\uFF01-\uFFE3]+/g.test(
					value
				);
		}
		if (validator.type === "MinLength") {
			if (!validator.val || typeof validator.val !== "number")
				throw new Error("parametor is error");
			isValid = isValid && value.trim().length >= validator.val;
		}
		if (validator.type === "MaxLength") {
			if (!validator.val || typeof validator.val !== "number")
				throw new Error("parametor is undefined");
			isValid = isValid && value.trim().length <= validator.val;
		}
	}
	return isValid;
};

export default checkValid;
