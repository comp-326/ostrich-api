import authorize from '@ostrich-middlewares/Auth/authorize';
import { Router } from 'express';
import MakeRequestAdapter from '@ostrich-domains/Workspace/Adapter';
import { getUserWorkspaces } from '@ostrich-domains/Workspace/controller';
const qRouter = Router();
export async function makeQueryUserWorkspaceApiCall(app: Router){
	app.use('/member', qRouter);
	qRouter.get('/:userId', authorize.loginRequired,MakeRequestAdapter(getUserWorkspaces));
}
