import { Router } from 'express';
import { createWorkspaceRoute } from './routes/createWorkspaceRoute';
import { getMembertWorkspacesRoute } from './routes/getMembertWorkspacesRoute';
import { getWorkspaceByIdRoute } from './routes/getWorkspaceByIdRoute';
import { getWorkspaceByNameRoute } from './routes/getWorkspaceByNameRoute';
import { getWorkspaces } from './routes/getWorkspaces';
import {updateWorkspaceRoute} from './routes/updateWorkspaceRoute';

export default ({ app, pathName }: { app: Router, pathName: string }) => {
	createWorkspaceRoute(app)(pathName);
	getMembertWorkspacesRoute(app)(pathName);
	getWorkspaceByIdRoute(app)(pathName);
	getWorkspaceByNameRoute(app)(pathName);
	updateWorkspaceRoute(app)(pathName);
	getWorkspaces(app)(pathName);
};
