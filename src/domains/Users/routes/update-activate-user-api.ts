import { Router } from 'express';
import MakeRequestAdapter from '../adapters';
import { activateAccount } from '../controllers';
const qRouter = Router();
export async function makeUpdateActivateUserApiCall(app: Router) {
	app.use('/account/activate', qRouter);
	qRouter.put(
		'/:activationToken',
		MakeRequestAdapter(activateAccount)
	);
}
