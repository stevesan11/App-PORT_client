import { useCallback, useEffect, useState } from "react";
import axios, { AxiosError, AxiosRequestHeaders, AxiosResponse } from "axios";

interface IConfig {
	method: string;
	url: string;
	data?: FormData | object;
	headers?: AxiosRequestHeaders;
}

interface IAxiosErrorData {
	message: string;
}
const useAxios = <T>(initialSend: boolean, config?: IConfig) => {
	const [response, setResponse] = useState<AxiosResponse<T, IConfig>>();
	const [error, setError] = useState<string>();
	const [loading, setLoading] = useState<boolean>();

	const controller = new AbortController();

	const sendRequest = useCallback(async (config: IConfig) => {
		const { method, url, data, headers } = config;
		setLoading(true);
		try {
			const response: AxiosResponse<T, IConfig> = await axios({
				method,
				url,
				data,
				headers,
				signal: controller.signal,
			});
			if (!response) {
				throw new Error("Something went wrong");
			}
			setResponse(response);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			if (axios.isAxiosError(error)) {
				const Error = error as AxiosError<IAxiosErrorData, IConfig>;
				let ErrorMessage;
				if (!Error.response?.data.message) {
					ErrorMessage = (error as AxiosError<unknown, IConfig>).message;
					setError(ErrorMessage);
					throw error;
				} else {
					ErrorMessage = Error.response.data.message;
					setError(ErrorMessage);
					throw error;
				}
			} else if (error instanceof Error) {
				setError(error.message);
				throw new Error("Something went wrong");
			}
		}
	}, []);

	const clearError = useCallback(() => {
		setError(undefined);
	}, []);

	useEffect(() => {
		if (initialSend && config) {
			sendRequest(config);
		}
		return () => {
			controller.abort();
		};
	}, []);

	return { response, error, loading, sendRequest, clearError };
};

export default useAxios;
