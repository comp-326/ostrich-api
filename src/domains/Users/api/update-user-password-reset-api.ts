import { Router } from 'express';
import MakeRequestAdapter from '../adapters';
import { updatePasword } from '../controllers';
const qRouter = Router();
export async function makeUpdateUserPasswordApiCall(app: Router) {
	app.use('/account/password/reset', qRouter);
	qRouter.post(
		'/:resetToken',
		MakeRequestAdapter(updatePasword)
	);
}
