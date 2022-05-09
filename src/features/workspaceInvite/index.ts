import { Router } from 'express';
import getConfirmedInvitesRoute from './routes/getConfirmedInvitesRoute';
import getPendingInvitesRoute from './routes/getPendingInvitesRoute';
import inviteUserToWorkspace from './routes/inviteUserToWorkspaceRoute';
export default ({ app, pathName }: { app: Router, pathName: string }) => {
	inviteUserToWorkspace(app)(pathName);
	getConfirmedInvitesRoute(app)(pathName);
	getPendingInvitesRoute(app)(pathName);
};