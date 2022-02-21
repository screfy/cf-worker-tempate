# Cloudflare Worker Template

A Cloudflare Worker template that uses TypeScript and a custom route parser to give you better route control.

## Setup

### Prerequisites

- [Node.js][node]
- [Wrangler][wrangler]
- Package Manager (this project is using [pnpm][pnpm])

### Setting up a project

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

Or you can run `pnpm deploy` from your terminal.

### Adding a new route

Create a new file in the [`routes`](src/routes) directory and add a new route(s), e.g.:

```ts
router.addRoute({
  path: new Route('/post'),
  method: 'POST',
  resolve: (req, res) => {
    return res.send({ method: req.method, data: { hello: 'world' } });
  }
});
```

Then import your new file into [`routes/index.ts`](src/routes/index.ts), and your route(s) will be automatically registered.

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
