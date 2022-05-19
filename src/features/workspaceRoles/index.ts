import { Router } from 'express';
import getUserRolesRoute from './routes/getRolesRoute';
import postNewRolesRoute from './routes/postNewRolesRoute';
<<<<<<< HEAD
=======

>>>>>>> 19227add749a048126a79c4f5addd72379b1e746
export default ({ app, pathName }: { app: Router, pathName: string }) => {
	getUserRolesRoute(app)(pathName);
	postNewRolesRoute(app)(pathName);
};