export default class HttpResponse {
	private statusCode: number;
	private headers: Headers;

	constructor() {
		this.statusCode = 200;
		this.headers = new Headers();
	}

	public status(code: number): HttpResponse {
		this.statusCode = code;

		return this;
	}

	public header(name: string, value: string): HttpResponse {
		this.headers.set(name, value);

		return this;
	}

	public redirect(url: string, status = 302): Response {
		const response = Response.redirect(url, status);

		return response;
	}

	public send(body: string | object): Response {
		if (typeof body === 'object') {
			body = JSON.stringify(body, null, 2);

			this.headers.set('content-type', 'application/json;charset=UTF-8');
		}

		const response = new Response(body, {
			status: this.statusCode,
			headers: this.headers
		});

		return response;
	}
}
