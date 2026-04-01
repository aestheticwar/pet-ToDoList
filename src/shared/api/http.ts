const BASE = import.meta.env.VITE_API_URL;
const VERSION = import.meta.env.VITE_API_VERSION;

type ApiErrorResponse = {
	message: string;
};

export class HttpError extends Error {
	status: number;
	data: unknown;

	constructor(message: string, status: number, data?: unknown) {
		super(message);
		this.name = "HttpError";
		this.status = status;
		this.data = data;
	}
}

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type RequestOptions = {
	method?: HttpMethod;
	body?: unknown;
	headers?: Record<string, string>;
	signal?: AbortSignal;
};

export const http = async <T>(
	url: string,
	options: RequestOptions = {},
): Promise<T> => {
	const { method = "GET", body, headers, signal } = options;

	const response = await fetch(`${BASE}${VERSION}${url}`, {
		method,
		signal,
		headers: {
			"Content-Type": "application/json",
			...headers,
		},
		body: body !== undefined ? JSON.stringify(body) : undefined,
	});

	let data: T | ApiErrorResponse | null = null;

	if (response.status !== 204) {
		const text = await response.text();
		data = text ? (JSON.parse(text) as T | ApiErrorResponse) : null;
	}

	if (!response.ok) {
		throw new HttpError(
			(data as ApiErrorResponse | null)?.message ?? "Request failed",
			response.status,
			data,
		);
	}

	return data as T;
};
