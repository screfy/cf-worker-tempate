import Route from 'route-parser';
import { RouteDefinition } from './types';

const routes: RouteDefinition[] = [
  {
    path: new Route('/'),
    method: 'GET',
    handler: (req, res) => {
      return res.send({ hello: 'world' });
    },
  },
];

export default routes;
