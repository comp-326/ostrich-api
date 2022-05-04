/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import RoleModel from '@ostrich-app/models/Roles/RoleModel';
import UserModel from '@ostrich-app/models/Users/UserModel';
// import Password from "../../Users/utils/Password"
import { IAuthRepository, IUser } from '../interfaces';

class AuthRepository implements IAuthRepository{
	createUser = async (user: IUser) => {
		const roles = await RoleModel.find();
		if (roles.length < 1) 
			await RoleModel.InsertRoles();
		
		const defaultRole = await RoleModel.findOne({ default: true });
		const newUser = await UserModel.create({
			...user,
			role: defaultRole,
		});

		return newUser;
	};
	findByEmail = async (email: string) => {
		const user = await UserModel.findOne({ email });
		return user;
	};

	login = async (email: string, password: string) => {
		const user = await UserModel.findOne({ email }).select('+password');
		const passwordMatch = await user?.comparePassword(password);
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password: _userPass, ...props } = user!._doc;
		return { passwordMatch, user: props };
	};
}

export default new AuthRepository();
