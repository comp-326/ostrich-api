import authorize from '@ostrich-middlewares/Auth/authorize';
import { Router } from 'express';
import MakeRequestAdapter from '../adapters';
import { putMoveFolder } from '../controllers';
const qRouter = Router();
export async function makeQueryUpdateMoveFolderApiCall(app: Router) {
	app.use('/move', qRouter);
	qRouter.put(
		'/:workspaceId/:folderId',
		authorize.loginRequired,
		MakeRequestAdapter(putMoveFolder),
	);
}
