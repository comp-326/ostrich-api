import { Router } from 'express';
import MakeRequestAdapter from '../adapters';
import { findUserAvailability } from '../controllers';

const qRouter = Router();
export function makeQueryUserVailabilityApiCall(app: Router){
	app.use('/', qRouter);
	qRouter.get('/', MakeRequestAdapter(findUserAvailability));
}
