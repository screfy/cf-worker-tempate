import { HttpMethod, Params } from '../types';

export default class HttpRequest {
	public method: HttpMethod;
	public url: URL;
	public params: Params;
	public query: URLSearchParams;
	public headers: Headers;
	public cf?: IncomingRequestCfProperties;
	public body: unknown;

	constructor(
		method: HttpMethod,
		url: URL,
		params: Params,
		query: URLSearchParams,
		headers: Headers,
		body: unknown,
		cf?: IncomingRequestCfProperties
	) {
		this.method = method;
		this.url = url;
		this.params = params;
		this.query = query;
		this.headers = headers;
		this.body = body;
		this.cf = cf;
	}
}
