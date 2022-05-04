import { Router } from 'express';
import MakeRequestAdapter from '../adapters';
import { findByName } from '../controllers';

const qRouter = Router();
export async function makeQueryFolderByNameApiCall(app: Router){
	app.use('/name', qRouter);
	qRouter.post('/', MakeRequestAdapter(findByName));
}
