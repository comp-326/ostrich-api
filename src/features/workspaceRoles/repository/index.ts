import { IWorkspaceRoleRepository } from './../interfaces';
import workspaceRoleModel from './../models';

class WorkspaceRoleRepository implements IWorkspaceRoleRepository{
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

export default new WorkspaceRoleRepository();