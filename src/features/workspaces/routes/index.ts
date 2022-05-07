import { Router } from 'express';
import createWorkspaceRoute from '@ostrich-app/features/workspaces/routes/createWorkspaceRoute';
import getMembertWorkspacesRoute from '@ostrich-app/features/workspaces/routes/getMembertWorkspacesRoute';
import getWorkspaceByIdRoute from '@ostrich-app/features/workspaces/routes/getWorkspaceByIdRoute';
import getWorkspaceByNameRoute from '@ostrich-app/features/workspaces/routes/getWorkspaceByNameRoute';
import updateWorkspaceRoute from '@ostrich-app/features/workspaces/routes/updateWorkspaceRoute';


export default ({ app, pathName }: { app: Router, pathName: string }) => {
	createWorkspaceRoute(app)(pathName);
	getMembertWorkspacesRoute(app)(pathName);
	getWorkspaceByIdRoute(app)(pathName);
	getWorkspaceByNameRoute(app)(pathName);	
	updateWorkspaceRoute(app)(pathName);			
};