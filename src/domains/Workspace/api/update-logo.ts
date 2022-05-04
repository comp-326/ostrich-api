import { Router } from 'express';
import MakeRequestAdapter from '@ostrich-app/domains/Workspace/Adapter';
import { putWorkspaceLogo } from '@ostrich-app/domains/Workspace/controller';
const qRouter = Router();
export async function makeQueryUpdateLogoWorkspaceApiCall(app: Router){
	app.use('/workspace/logo', qRouter);
	qRouter.put('/:id', MakeRequestAdapter(putWorkspaceLogo));
}
