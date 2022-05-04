import authorize from '@ostrich-middlewares/Auth/authorize';
import RoleModel from '@ostrich-models/Roles/RoleModel';
import { Router } from 'express';

const qRouter = Router();
export function makeQueryRolesApiCall(app: Router){
	app.use('/roles', qRouter);
	qRouter.get('/', authorize.loginRequired, async (_req, res) => {
		const roles = await RoleModel.find();
		if (roles.length < 1) {
			const newRoles = await RoleModel.InsertRoles();
			return res.status(200).json({ roles: newRoles });
		}
		return res.status(200).json({ roles });
	});
}
