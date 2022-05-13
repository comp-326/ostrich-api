import { Router } from 'express';
import createNewInvite from './routes/createInviteRoute';
import deleteInviteRoute from './routes/deleteInviteRoute';
import getConfirmedInvitesRoute from './routes/getConfirmedInvitesRoute';
import getPendingInvitesRoute from './routes/getPendingInvitesRoute';
import updateInviteRoute from './routes/updateInviteRoute';

export default ({ app, pathName }: { app: Router, pathName: string }) => {
	createNewInvite(app)(pathName);
	getConfirmedInvitesRoute(app)(pathName);
	getPendingInvitesRoute(app)(pathName);
	deleteInviteRoute(app)(pathName);
	updateInviteRoute(app)(pathName);
};