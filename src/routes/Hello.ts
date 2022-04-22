import Route from 'route-parser';
import router from '../utils/Router';

router.addRoute({
	path: new Route('/'),
	method: 'GET',
	resolve: (req, res) => {
		return res.send({ hello: 'world' });
	}
});
