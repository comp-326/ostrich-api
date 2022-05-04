import { SwaggerSetup, swaggerServe } from '@ostrich-app/utils/docs';
import { Router } from 'express';
import { environmentConfig } from '@ostrich-app/config';
import folderDomain from '@ostrich-app/domains/Folders/routes';
import testRoute from './testRoute';
import userDomain from '@ostrich-app/domains/Users/routes';

const apiRoute = Router();
export default function (){
	const basePath = environmentConfig.API_PREFIX;
	userDomain({ app: apiRoute, pathName: `${basePath}/users` });
	folderDomain({ app: apiRoute, pathName: `${basePath}/folders` });
	apiRoute.get(`${basePath}/test`, testRoute);
	apiRoute.use(`${basePath}/docs`, swaggerServe, SwaggerSetup);
	return apiRoute;
}
