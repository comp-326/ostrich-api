import { Router } from 'express';
import cancelRoute from './routes/cancelroute';
import createRoute from './routes/createroute';
import getAllRoute from './routes/getAllroute';
import getCancelledRoute from './routes/getCancelled';
import getPastRoute from './routes/getpastroute';
import getUpcomingRoute from './routes/getUpcomingroute';
import updateRoute from './routes/updateroute';

export default ({ app, pathName }: { app: Router, pathName: string }) => {
	cancelRoute(app)(pathName);
	createRoute(app)(pathName);
	getAllRoute(app)(pathName);
	getPastRoute(app)(pathName);
	getCancelledRoute(app)(pathName);
	getUpcomingRoute(app)(pathName);
	updateRoute(app)(pathName);
};