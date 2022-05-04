import MakeRequestAdapter from '../adapters';
import { Router } from 'express';
import authorize from '@ostrich-middlewares/Auth/authorize';
import { deleteUser } from '../controllers';

const qRouter = Router();
export async function makeDeleteUserApiCall(app: Router){
	app.use('/delete', qRouter);
	qRouter.delete(
		'/:id',
		authorize.loginRequired,
		MakeRequestAdapter(deleteUser)
	);
}
