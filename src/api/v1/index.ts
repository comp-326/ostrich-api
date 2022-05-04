import { SwaggerSetup, swaggerServe } from '@ostrich-utils/docs';
import { Router } from 'express';
import UserDomain from '@ostrich/src/domains/Users/routes';
import { environmentConfig } from '@ostrich/src/config';
import testRoute from './testRoute';

const apiRoute = Router();
export default function (){
	const basePath = environmentConfig.API_PREFIX;
	UserDomain({ app: apiRoute, pathName: `${basePath}/users` });
	apiRoute.get(`${basePath}/test`, testRoute);
	apiRoute.use(`${basePath}/docs`, swaggerServe, SwaggerSetup);
	return apiRoute;
}
