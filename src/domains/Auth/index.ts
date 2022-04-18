import { Router } from 'express';
import api from './api';

const authRouter = Router();
export default function authDomain(app: Router) {
	app.use('/auth', authRouter);
	api.makeQueryLoginApiCall(authRouter);
	api.makeQueryRegisterApiCall(authRouter);
	api.makeQueryRolesApiCall(authRouter);
	api.makeQueryLogoutApiCall(authRouter);
	return app;
}
