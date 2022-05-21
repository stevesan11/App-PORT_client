export interface IResponseAuth {
	userId: string;
	token: string;
}
export interface IResponseUsers {
	user: IUser[];
}
export interface IResponseUser {
	user: IUser;
}
export interface IResponseApp {
	app: IApp;
}

export interface IUser {
	_id: string;
	image: string;
	username: string;
	apps: Array<IApp>;
}
export interface IApp {
	_id: string;
	title: string;
	description: string;
	image: string;
	url: string;
}
