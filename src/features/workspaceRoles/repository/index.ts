import { IUserRoleRepository } from './../interfaces';
import workspaceRoleModel from './../models';

class UserRoleRepository implements IUserRoleRepository{
	findByName = async (name: string) => {
		const role = await workspaceRoleModel.findOne({ name });
		if (role) return role;

		return null;
	};

	createRoles = async () => {
		const roles = await workspaceRoleModel.InsertRoles();

		return roles;
	};

	findRoles = async () => {
		const roles = await workspaceRoleModel.find({});

		return roles;
	};

}

export default new UserRoleRepository();