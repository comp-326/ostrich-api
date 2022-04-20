import { Router } from 'express';
import MakeRequestAdapter from '../Adapter';
import { putWorkspace } from '../controller';
import authorize from '@base/src/middlewares/Auth/authorize';
import uploader from '@base/src/uploader';
const qRouter = Router();
export async function makeQueryUpdateWorkspaceApiCall(app: Router) {
	app.use('/update', qRouter);
	qRouter.post(
		'/:id',
		authorize.loginRequired,
		uploader.imageUpload.single('logo'),
		MakeRequestAdapter(putWorkspace)
	);
}
