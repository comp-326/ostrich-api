/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IUser } from '@ostrich-app/features/users/models/interfaces';
import { IUserRepository } from '@ostrich-app/features/users/interfaces';
import UserModel from '@ostrich-app/features/users/models';
import UserRoleModel from '@ostrich-app/features/userRoles/models';
import { generateGravatarUrl } from '@ostrich-app/common/gravatar';
import mediaModel from '@ostrich-app/features/media/models';

class UserRepository implements IUserRepository{


	createUser=async (userData: IUser) => {
		const role = await UserRoleModel.getDefaultRole();
		if (role) {
			const profilePicture = await mediaModel.create({
				type:'profile',
				url:generateGravatarUrl(userData.email),
				uploadId:userData.email,
				size:200,
				mediaType:'image'
			});
			
			
			const newUser = await UserModel.create({...userData,role,profilePicture});

			return newUser;
		}else {

			await UserRoleModel.InsertRoles();
			const defaultRole = await UserRoleModel.getDefaultRole();
			const profilePicture = await mediaModel.create({
				type:'profile',
				url:generateGravatarUrl(userData.email),
				uploadId:userData.email,
				size:200,
				mediaType:'image'
			});
			const newUser = await UserModel.create({ ...userData, role: defaultRole ,profilePicture});

			return newUser;
		}
	};

	findByEmail=async(email: string) => {
		const user = await UserModel.findOne({email}) as unknown as any;

		return user;
	};

	findById = async (id: string) => {
		const user = await UserModel.findById(id).select('+password');

		return user;
	};

	find = async (limit: number, page: number) => {
		const users = await UserModel.find({})
			.populate('role', 'name -_id ')
			.limit(limit)
			.skip(limit * (page - 1));

		return users;
	};

	updateById = async (id: string, data: IUser) => {
		const updated = await UserModel.findByIdAndUpdate(
			id,
			{ ...data },
			{ new: true }
		).select('+password');

		return updated!._doc;
	};

	deleteById = async (id: string) => {
		const deleted = await UserModel.findByIdAndDelete(id);

		return deleted!._doc;
	};
}

export default new UserRepository();
