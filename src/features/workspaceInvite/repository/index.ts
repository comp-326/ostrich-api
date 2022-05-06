import { IUserRoleRepository } from '@ostrich-app/features/userRoles/interfaces';
import UserRoleModel from '@ostrich-app/features/userRoles/models';

class UserRoleRepository implements IUserRoleRepository{
	findByName = async (name: string) => {
		const role = await UserRoleModel.findOne({ name });
		if (role) return role;

		return null;
	};

	createRoles = async () => {
		const roles = await UserRoleModel.InsertRoles();

		return roles;
	};

	findRoles = async () => {
		const roles = await UserRoleModel.find({});

		return roles;
	};

}

export default new UserRoleRepository();