import { Router } from 'express';
import loginUserRoute from './routes/loginUserRoute';
import logoutUserRoute from './routes/logoutUserRoute';
<<<<<<< HEAD
=======

>>>>>>> 19227add749a048126a79c4f5addd72379b1e746
export default ({ app, pathName }: { app: Router, pathName: string }) => {
	loginUserRoute(app)(pathName);
	logoutUserRoute(app)(pathName);
};