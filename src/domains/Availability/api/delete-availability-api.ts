import { Router } from 'express';
import MakeRequestAdapter from '../adapters';
import { deleteById } from '../controllers';
import authorize from '@ostrich-middlewares/Auth/authorize';

const qRouter = Router();
export async function makeDeleteAvailabilityApiCall(app: Router) {
	app.use('/delete', qRouter);
	qRouter.delete(
		'/:id',
		authorize.loginRequired,
		MakeRequestAdapter(deleteById),
	);
}
