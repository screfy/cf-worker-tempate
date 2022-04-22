import router from './utils/Router';
import { HttpMethod, Params } from './types';
import HttpResponse from './utils/HttpResponse';
import HttpRequest from './utils/HttpRequest';

// Register all routes:
import './routes';

// This function will be called when the route will not be found:
function notFound(req: HttpRequest, res: HttpResponse): Response {
	return res.status(404).send({ message: 'route not found' });
}

addEventListener('fetch', (event) => {
	event.respondWith(
		new Promise(async (resolve) => {
			const request = event.request.clone();
			const method = request.method as HttpMethod;
			const url = new URL(request.url);
			const query = url.searchParams;
			const headers = request.headers;
			const cf = request.cf;

			let body;

			if (!['GET', 'HEAD', 'OPTIONS'].includes(method)) {
				if (headers.get('content-type')?.startsWith('application/json')) {
					body = await request.json();
				} else {
					body = await request.text();
				}
			}

			// Remove trailing slash:
			const path =
				url.pathname.endsWith('/') && url.pathname.length > 1
					? url.pathname.slice(0, -1)
					: url.pathname;

			// Find a route that matches the requested path:
			const route = router.routes.find(
				(route) => route.path.match(path) && route.method.includes(method)
			);

			// Get a params:
			const params = route?.path.match(path) as Params;

			const httpRequest = new HttpRequest(
				method,
				url,
				params,
				query,
				headers,
				body,
				cf
			);
			const httpResponse = new HttpResponse();

			// Handle request if the route was found or return 404:
			resolve(
				route
					? route.resolve(httpRequest, httpResponse)
					: notFound(httpRequest, httpResponse)
			);
		})
	);
});
