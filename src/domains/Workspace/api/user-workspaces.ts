import authorize from '@ostrich-middlewares/Auth/authorize';
import { Router } from 'express';
import MakeRequestAdapter from '@ostrich-app/domains/Workspace/Adapter';
import { getUserWorkspaces } from '@ostrich-app/domains/Workspace/controller';
const qRouter = Router();
export async function makeQueryUserWorkspaceApiCall(app: Router){
	app.use('/member', qRouter);
	qRouter.get('/:userId', authorize.loginRequired,MakeRequestAdapter(getUserWorkspaces));
}
