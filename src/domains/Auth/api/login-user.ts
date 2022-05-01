import { Router } from 'express';
import MakeRequestAdapter from '@ostrich-domains/Auth/adapters';
import { loginUser } from '@ostrich-domains/Auth/controllers';

const qRouter = Router();
export async function makeQueryLoginApiCall(app: Router) {
	app.use('/login', qRouter);
	qRouter.post('/', MakeRequestAdapter(loginUser));
}
