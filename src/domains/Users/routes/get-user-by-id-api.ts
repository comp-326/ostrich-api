import { Router } from 'express';
import MakeRequestAdapter from '../adapters';
import { findById } from '../controllers';

const qRouter = Router();
export async function makeQueryIdUserApiCall(app: Router) {
	app.use('/profile', qRouter);
	qRouter.get('/:id', MakeRequestAdapter(findById));
}
