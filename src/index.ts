import NotFound from './handlers/NotFound';
import routes from './routes';
import { HttpMethod, HttpRequest, HttpResponse, Params } from './types';

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
      const path = url.pathname.endsWith('/') && url.pathname.length > 1 ? url.pathname.slice(0, -1) : url.pathname;

      // Find a route that matches the requested path:
      const route = routes.find((route) => route.path.match(path) && route.method.includes(method));

      // Get a params:
      const params = route?.path.match(path) as Params;

      const httpRequest: HttpRequest = {
        method,
        url,
        params,
        query,
        headers,
        body,
        cf,
      };

      const httpResponse: HttpResponse = {
        statusCode: 200,
        headers: new Headers(),
        status: (code) => {
          httpResponse.statusCode = code;

          return httpResponse;
        },
        header: (name, value) => {
          httpResponse.headers.set(name, value);

          return httpResponse;
        },
        redirect: (url, status = 302) => {
          const response = Response.redirect(url, status);

          return response;
        },
        send: (body) => {
          if (typeof body === 'object') {
            body = JSON.stringify(body, null, 2);

            httpResponse.headers.set('content-type', 'application/json;charset=UTF-8');
          }

          const response = new Response(body, { status: httpResponse.statusCode, headers: httpResponse.headers });

          return response;
        },
      };

      // Handle request if the route was found or return 404:
      resolve(route ? await route.handler(httpRequest, httpResponse) : NotFound(httpRequest, httpResponse));
    })
  );
});
