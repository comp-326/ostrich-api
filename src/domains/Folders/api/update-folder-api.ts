import authorize from '@base/src/middlewares/Auth/authorize';
import { Router } from 'express';
import MakeRequestAdapter from '../adapters';
import { putFolder } from '../controllers';
const qRouter = Router();
export async function makeQueryUpdateFolderApiCall(app: Router) {
	app.use('/update', qRouter);
	qRouter.put('/:id', authorize.loginRequired, MakeRequestAdapter(putFolder));
}
