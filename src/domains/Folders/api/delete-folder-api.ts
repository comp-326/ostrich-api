import { Router } from 'express';
import MakeRequestAdapter from '../adapters';
import { deleteFolder } from '../controllers';
import authorize from '@base/src/middlewares/Auth/authorize';

const qRouter = Router();
export async function makeQueryDeleteFolderApiCall(app: Router) {
	app.use('/delete', qRouter);
	qRouter.delete(
		'/:id',
		authorize.loginRequired,
		MakeRequestAdapter(deleteFolder),
	);
}
