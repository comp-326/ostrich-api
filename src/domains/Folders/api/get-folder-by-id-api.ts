import { Router } from 'express';
import MakeRequestAdapter from '../adapters';
import { findById } from '../controllers';

const qRouter = Router();
export async function makeQueryIdFolderApiCall(app: Router){
	app.use('/single', qRouter);
	qRouter.get('/:id', MakeRequestAdapter(findById));
}
