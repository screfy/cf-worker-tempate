import Route from 'route-parser';

export type HttpMethod =
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'OPTIONS'
  | 'PATCH';
export type Params = { [key: string]: string | undefined };

export interface HttpRequest {
  method: HttpMethod;
  url: URL;
  params: Params;
  query: URLSearchParams;
  headers: Headers;
  cf?: IncomingRequestCfProperties;
  body: unknown;
}

export interface HttpResponse {
  statusCode: number;
  headers: Headers;
  status(code: number): HttpResponse;
  header(name: string, value: string): HttpResponse;
  redirect(url: string, status?: number): Response;
  send(body: string | object): Response;
}

export interface RouteDefinition {
  path: Route;
  method: HttpMethod | HttpMethod[];
  handler(req: HttpRequest, res: HttpResponse): Response | Promise<Response>;
}
