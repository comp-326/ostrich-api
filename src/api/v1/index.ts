import { SwaggerSetup, swaggerServe } from '@ostrich-app/utils/docs';
import { Router } from 'express';
import folderDomain from '@ostrich-app/features/folders/routes';
import testRoute from './testRoute';
import userDomain from '@ostrich-app/features/users/routes';
import workspaceDomain from '@ostrich-app/features/workspaces/routes';

const apiRoute = Router();
export default function (){
	// const basePath = environmentConfig.API_PREFIX;/
	apiRoute.get('/test', testRoute);
	apiRoute.use('/docs', swaggerServe, SwaggerSetup);
	folderDomain({ app: apiRoute, pathName: '/folders' });
	userDomain({ app: apiRoute, pathName: '/users' });
	workspaceDomain({ app: apiRoute, pathName: '/workspaces' });
	return apiRoute;
}
