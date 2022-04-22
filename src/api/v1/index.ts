import workspaceDomain from '@domains/Workspace';
import authDomain from '@domains/Auth';
import userDomain from '@domains/Users';
import { swaggerServe, SwaggerSetup } from '@utils/docs';
import { Router } from 'express';
import availabilityDomain from '@domains/Availability';
import folderDomain from '@domains/Folders';
import test_route from './test_route';

export default function () {
	const apiRoute = Router();
	userDomain(apiRoute);
	authDomain(apiRoute);
	workspaceDomain(apiRoute);
	availabilityDomain(apiRoute);
	folderDomain(apiRoute);
	apiRoute.get('/', test_route);
	apiRoute.use('/docs', swaggerServe, SwaggerSetup);
	return apiRoute;
}
