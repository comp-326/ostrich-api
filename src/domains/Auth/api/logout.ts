import authorize from '@base/src/middlewares/Auth/authorize';
import { Router } from 'express';

const qRouter = Router();
export async function makeQueryLogoutApiCall(app: Router) {
	app.use('/logout', qRouter);
	qRouter.post('/', authorize.loginRequired, (req, res) => {
		return res.clearCookie('access_token').status(200).json({
			message: 'Logout Successfully'
		});
	});
}
