import authorize from '@base/src/middlewares/Auth/authorize';
import { Router } from 'express';
import MakeRequestAdapter from '../adapters';
import { putById } from '../controllers';
const qRouter = Router();
export async function makeUpdateAvailabilityApiCall(app: Router) {
	app.use('/update', qRouter);
	qRouter.put('/:id', authorize.loginRequired,MakeRequestAdapter(putById));
}
