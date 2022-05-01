import workspaceDomain from '@ostrich-domains/Workspace';
import authDomain from '@ostrich-domains/Auth';
import userDomain from '@ostrich-domains/Users';
import { swaggerServe, SwaggerSetup } from '@ostrich-utils/docs';
import { Router } from 'express';
import availabilityDomain from '@ostrich-domains/Availability';
import folderDomain from '@ostrich-domains/Folders';
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
