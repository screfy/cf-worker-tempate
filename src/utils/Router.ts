import { RouteDefinition } from '../types';

class Router {
  public readonly routes: RouteDefinition[];

  constructor() {
    this.routes = [];
  }

  public addRoute(route: RouteDefinition): Router {
    this.routes.push(route);

    return this;
  }
}

const router = new Router();

export default router;
