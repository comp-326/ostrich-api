import authorize from '@base/src/middlewares/Auth/authorize';
import { Router } from 'express';
import MakeRequestAdapter from '../adapters';
import { findUsers } from '../controllers';

const qRouter = Router();
export function makeQueryUserApiCall(app: Router) {
	app.use('/', qRouter);
	qRouter.get('/',authorize.loginRequired, MakeRequestAdapter(findUsers));
}
