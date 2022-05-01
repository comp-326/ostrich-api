/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ExpressError } from '@ostrich-common/errors/ExpressError';
import createUser from '../entities';
import { IUser, IUserRepository } from '../interfaces';
import VerifyUserJWT from '../utils/jwt/VerifyUserJWT';

export default function makeEditUserPasswordUseCase({
	userDB
}: {
	userDB: IUserRepository;
}) {
	return async function editUserUserPasswordUseCase(
		resetToken: string,
		data: Pick<IUser, 'password'> & { confirmPassword: string }
	) {
		if (!resetToken) {
			throw new ExpressError({
				message: 'Please provide a reset token',
				statusCode: 400,
				data: {},
				status: 'warning'
			});
		}

		const userId = (await VerifyUserJWT.verifyPasswordToken(
			resetToken
		)) as unknown as string;
		if (!data.password) {
			throw new ExpressError({
				data: {},
				message: 'Password required',
				status: 'warning',
				statusCode: 400
			});
		}
		if (!data.confirmPassword) {
			throw new ExpressError({
				data: {},
				message: 'Passwords do not match',
				status: 'warning',
				statusCode: 400
			});
		}
		if (data.password !== data.confirmPassword) {
			throw new ExpressError({
				data: {},
				message: 'Passwords do not match',
				status: 'warning',
				statusCode: 400
			});
		}
		const existing = await userDB.findById(userId);
		if (!existing) {
			throw new ExpressError({
				message: 'User does not exist',
				statusCode: 404,
				data: {},
				status: 'warning'
			});
		}
		const user =await createUser({ ...existing._doc, ...data });
		await userDB.updateById(existing._id, {
			email: user.getEmail(),
			password: user.getPassword(),
			dateOfBirth: user.getDateOfBirth(),
			firstName: user.getFirsName(),
			isActive: user.getIsActive(),
			lastName: user.getLastName(),
			avatar: user.getAvatar()
		});
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		return true;
	};
}
