import authorize from '@base/src/middlewares/Auth/authorize';
import uploader from '@base/src/uploader';
import { Router } from 'express';
import MakeRequestAdapter from '../adapters';
import { putUser } from '../controllers';
const qRouter = Router();
export async function makeUpdateUserApiCall(app: Router) {
	app.use('/profile/update', qRouter);
	qRouter.put(
		'/:id',
		authorize.loginRequired,
		uploader.imageUpload.single('avatar'),
		MakeRequestAdapter(putUser)
	);
}
