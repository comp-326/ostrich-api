import { Router } from 'express';
import api from './api';

const availabilityRouter = Router();
export default function availabilityDomain(app: Router){
	app.use('/availability', availabilityRouter);
	api.makeQueryNewAvailabilityApiCall(availabilityRouter);
	api.makeUpdateAvailabilityApiCall(availabilityRouter);
	api.makeQueryAvailabilityIdApiCall(availabilityRouter);
	api.makeQueryUserVailabilityApiCall(availabilityRouter);
	api.makeDeleteAvailabilityApiCall(availabilityRouter);

	return app;
}
