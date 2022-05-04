import { Router } from 'express';
import MakeRequestAdapter from '@ostrich-domains/Auth/adapters';
import { postUser } from '@ostrich-domains/Auth/controllers';
const qRouter = Router();
export async function makeQueryRegisterApiCall(app: Router){
	app.use('/register', qRouter);
	qRouter.post('/', MakeRequestAdapter(postUser));
}
