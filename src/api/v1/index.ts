import { Router } from 'express';
import authDomain from '@ostrich-app/features/auth';
import folderDomain from '@ostrich-app-features/folders/routes';
import testRoute from './testRoute';
import userDomain from '@ostrich-app/features/users';
import userRolesDomain from '@ostrich-app/features/userRoles';
import workspaceDomain from '@ostrich-app/features/workspaces';
import workspaceInviteDomain from '@ostrich-app/features/workspaceInvite';
import workspaceMemberDomain from '@ostrich-app/features/workspaceMember';
import workspaceRoleDomain from '@ostrich-app/features/workspaceRoles';
import { swaggerServe, swaggerSetup } from '@ostrich-app/utils/docs';

const apiRoute = Router();

export default function () {
	apiRoute.get('/test', testRoute);
	apiRoute.use('/docs', swaggerServe, swaggerSetup);
	folderDomain({ app: apiRoute, pathName: '/folders' });
	userDomain({ app: apiRoute, pathName: '/users' });
	workspaceDomain({ app: apiRoute, pathName: '/workspaces' });
	userRolesDomain({ app: apiRoute, pathName: '/u-roles' });
	workspaceRoleDomain({ app: apiRoute, pathName: '/w-roles' });
	workspaceInviteDomain({ app: apiRoute, pathName: '/workspace-invite' });
	authDomain({app:apiRoute,pathName:'/auth'});
	workspaceMemberDomain({app:apiRoute,pathName:'/workspace-member'});

	return apiRoute;
}
