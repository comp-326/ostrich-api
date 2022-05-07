import { Router } from 'express';
import folderDomain from '@ostrich-app/features/folders/routes';
import testRoute from './testRoute';
import userDomain from '@ostrich-app/features/users';
import userRolesDomain from '@ostrich-app/features/userRoles';
import workspaceDomain from '@ostrich-app/features/workspaces';
import { swaggerServe, swaggerSetup } from '@ostrich-app/utils/docs';

const apiRoute = Router();
export default function (){
	apiRoute.get('/test', testRoute);
	apiRoute.use('/docs', swaggerServe, swaggerSetup);
	folderDomain({ app: apiRoute, pathName: '/folders' });
	userDomain({ app: apiRoute, pathName: '/users' });
	workspaceDomain({ app: apiRoute, pathName: '/workspaces' });
	userRolesDomain({ app: apiRoute, pathName: '/u-roles' });

	return apiRoute;
}
