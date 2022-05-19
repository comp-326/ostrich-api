import { IUserRoleRepository } from './../interfaces';
import workspaceRoleModel from './../models';

class UserRoleRepository implements IUserRoleRepository{
	findByName = async (name: string) => {
		const role = await workspaceRoleModel.findOne({ name });
		if (role) return role;

		return null;
	};

	createRoles = async () => {
		return await workspaceRoleModel.InsertRoles();
		
	};

	findRoles = async () => {
		return await workspaceRoleModel.find({});

	};

}

export default new UserRoleRepository();