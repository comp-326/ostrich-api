import { Router } from 'express';
import MakeRequestAdapter from '../adapters';
import { postRequestActivation } from '../controllers';

const qRouter = Router();
export async function makeQueryActivateAccountApiCall(app: Router) {
	app.use('/account/activate', qRouter);
	qRouter.post('/', MakeRequestAdapter(postRequestActivation));
}
