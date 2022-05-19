import { IUserRoleRepository } from './../interfaces';
<<<<<<< HEAD
import UserRoleModel from './../models';

class UserRoleRepository implements IUserRoleRepository{
	findByName = async (name: string) => {
		const role = await UserRoleModel.findOne({ name });
=======
import workspaceRoleModel from './../models';

class UserRoleRepository implements IUserRoleRepository{
	findByName = async (name: string) => {
		const role = await workspaceRoleModel.findOne({ name });
>>>>>>> 19227add749a048126a79c4f5addd72379b1e746
		if (role) return role;

		return null;
	};

	createRoles = async () => {
<<<<<<< HEAD
		const roles = await UserRoleModel.InsertRoles();
=======
		const roles = await workspaceRoleModel.InsertRoles();
>>>>>>> 19227add749a048126a79c4f5addd72379b1e746

		return roles;
	};

	findRoles = async () => {
<<<<<<< HEAD
		const roles = await UserRoleModel.find({});
=======
		const roles = await workspaceRoleModel.find({});
>>>>>>> 19227add749a048126a79c4f5addd72379b1e746

		return roles;
	};

}

export default new UserRoleRepository();