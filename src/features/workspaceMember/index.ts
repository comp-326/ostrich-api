import { Router } from 'express';
import addWorkspaceMemberRoute from './routes/addWorkspaceMemberRoute';
import getSingleMemberRoute from './routes/getSingleMemberRoute';
import joinWorkspaceMemberRoute from './routes/joinWorkspaceMemberRoute';
import removeWorkspaceMemberRoute from './routes/removeWorkspaceMemberRoute';
import updateMemberRoleRoute from './routes/updateMemberRoleRoute';
export default ({ app, pathName }: { app: Router, pathName: string }) => {
	addWorkspaceMemberRoute(app)(pathName);
	getSingleMemberRoute(app)(pathName);
	getSingleMemberRoute(app)(pathName);
	joinWorkspaceMemberRoute(app)(pathName);
	removeWorkspaceMemberRoute(app)(pathName);
	updateMemberRoleRoute(app)(pathName);
};