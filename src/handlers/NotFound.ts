import { HttpRequest, HttpResponse } from '../types';

export default function (req: HttpRequest, res: HttpResponse) {
  return res.status(404).send({ message: 'route not found' });
}
