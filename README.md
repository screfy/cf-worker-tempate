# Cloudflare Worker Template

A Cloudflare Worker template that uses TypeScript and a custom route parser to give you better route control.

## Setup

### Prerequisites

- [Node.js][node]
- [Wrangler][wrangler]
- Package Manager (this project is using [pnpm][pnpm])

### Setting Up a Project

1. Click on [Use this template][template].
2. [Clone][cloning-a-repo] your repository.
3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Start the development server (this project is using [Miniflare][miniflare], a simulator for developing and testing [Cloudflare Workers][workers]):

   ```bash
   pnpm dev
   ```

5. Open development site: [`http://localhost:8787`](http://localhost:8787).

## Documentation

### Configuration

You need to fill out [`wrangler.toml`](wrangler.toml) with your details (`account_id`). Other options you can find [here][wrangler-configuration].

### Deployment

This repository is using [Wrangler Action](.github/workflows/deploy.yml) for deployment. You'll need to configure Wrangler using [GitHub's encrypted secrets feature][encrypted-secrets] and add your [Cloudflare API token][api-token]. Action will deploy your application on pushes to the `main` or `master` branch.

### Routes

You must register your new route in the [`routes.ts`](src/routes.ts) file.

```ts
interface RouteDefinition {
  path: Route;
  method: HttpMethod | HttpMethod[];
  handler(req: HttpRequest, res: HttpResponse): Response | Promise<Response>;
}
```

### Request

```ts
interface HttpRequest {
  method: HttpMethod;
  url: URL;
  params: Params;
  query: URLSearchParams;
  headers: Headers;
  cf?: IncomingRequestCfProperties;
  body: unknown;
}
```

### Response

```ts
interface HttpResponse {
  statusCode: number;
  headers: Headers;
  status(code: number): HttpResponse;
  header(name: string, value: string): HttpResponse;
  redirect(url: string, status?: number): Response;
  send(body: string | object): Response;
}
```

## License

This project is licensed under the [MIT license](LICENSE).

[node]: https://nodejs.org
[wrangler]: https://developers.cloudflare.com/workers/cli-wrangler/install-update
[pnpm]: https://pnpm.io
[template]: https://github.com/screfy/cf-worker-tempate/generate
[cloning-a-repo]: https://help.github.com/en/articles/cloning-a-repository
[miniflare]: https://miniflare.dev
[workers]: https://workers.cloudflare.com
[wrangler-configuration]: https://developers.cloudflare.com/workers/cli-wrangler/configuration
[encrypted-secrets]: https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository
[api-token]: https://developers.cloudflare.com/api/tokens/create
