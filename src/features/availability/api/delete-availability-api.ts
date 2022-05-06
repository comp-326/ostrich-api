import MakeRequestAdapter from '../adapters';
import { Router } from 'express';
import authorize from '@ostrich-app/middlewares/Auth/authorize';
import { deleteById } from '../controllers';

const qRouter = Router();
export async function makeDeleteAvailabilityApiCall(app: Router){
	app.use('/delete', qRouter);
	qRouter.delete(
		'/:id',
		authorize.loginRequired,
		MakeRequestAdapter(deleteById),
	);
}
