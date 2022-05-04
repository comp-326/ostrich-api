import { Router } from 'express';
import MakeRequestAdapter from '@ostrich-domains/Workspace/Adapter';
import { postWorkspace } from '@ostrich-domains/Workspace/controller';
import  authorize  from '@ostrich-middlewares/Auth/authorize';
const qRouter = Router();
export async function makeQueryNewWorkspaceApiCall(app: Router){
	app.use('/new', qRouter);
	qRouter.post('/', authorize.loginRequired,MakeRequestAdapter(postWorkspace));
}
