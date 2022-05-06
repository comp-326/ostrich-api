import { Router } from 'express';
import getUserRolesRoute from '@ostrich-app/features/userRoles/routes/getRolesRoute';
import postNewRolesRoute from '@ostrich-app/features/userRoles/routes/postNewRolesRoute';
export default ({ app, pathName }: { app: Router, pathName: string }) => {
	getUserRolesRoute(app)(pathName);
	postNewRolesRoute(app)(pathName);
};