import authorize from '@ostrich-middlewares/Auth/authorize';
import { Router } from 'express';
import MakeRequestAdapter from '@ostrich-app/domains/Workspace/Adapter';
import { getWorkspaces } from '@ostrich-app/domains/Workspace/controller';
const qRouter = Router();
export async function makeQueryAllWorkspaceApiCall(app: Router){
	app.use('/', qRouter);
	qRouter.get('/', authorize.adminRequired,MakeRequestAdapter(getWorkspaces));
}
