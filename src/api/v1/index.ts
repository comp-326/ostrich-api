import { Router } from 'express';
import folderDomain from '@ostrich-app/features/folders/routes';
import notificationDomain from '@ostrich-app/features/notifications/routes';
import servicesRoute from '@ostrich-app/features/services/routes';
import standoutDomain from '@ostrich-app/features/standouts/routes';
import testRoute from './testRoute';
import userDomain from '@ostrich-app/features/users';
import userRolesDomain from '@ostrich-app/features/userRoles';
import workspaceDomain from '@ostrich-app/features/workspaces/routes';
import { swaggerServe, swaggerSetup } from '@ostrich-app/utils/docs';

const apiRoute = Router();
export default function (){
	apiRoute.get('/test', testRoute);
	apiRoute.use('/docs', swaggerServe, swaggerSetup);
	folderDomain({ app: apiRoute, pathName: '/folders' });
	userDomain({ app: apiRoute, pathName: '/users' });
	workspaceDomain({ app: apiRoute, pathName: '/workspaces' });
	standoutDomain({ app: apiRoute, pathName: '/standouts' });
	notificationDomain({ app: apiRoute, pathName: '/notifications' });
	servicesRoute({ app: apiRoute, pathName: '/services' });
	userRolesDomain({ app: apiRoute, pathName: '/u-roles' });

	return apiRoute;
}
