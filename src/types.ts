import Route from 'route-parser';
import HttpRequest from './utils/HttpRequest';
import HttpResponse from './utils/HttpResponse';

export type HttpMethod =
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'OPTIONS'
  | 'PATCH';
export type Params = { [key: string]: string | undefined };

export interface RouteDefinition {
  path: Route;
  method: HttpMethod | HttpMethod[];
  resolve(req: HttpRequest, res: HttpResponse): Response | Promise<Response>;
}
