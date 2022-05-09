import { IAuthRepository } from '../interfaces';
import userModel from '@ostrich-app/features/users/models';


class AuthRepository implements IAuthRepository {
	getUserByEmail=async (email: string) => {
		const user =  await userModel.findOne({email}).select('+password');

		return user;
	};

}

export default new AuthRepository();