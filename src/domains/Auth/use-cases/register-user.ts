/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExpressError } from '@ostrich-common/errors/ExpressError';
import UserAccountMailer from '@ostrich-domains/Users/utils/mail/UserAccountMailer';
import createUser from '@ostrich-domains/Auth/entities';
import { IUser, IAuthRepository } from '@ostrich-domains/Auth/interfaces';

export default function makeRegisterUserUseCase({
	userDB
}: {
	userDB: IAuthRepository;
}) {
	return async function registerUserUseCase(userInfo: IUser) {
		const user = await createUser(userInfo);
		const existing = await userDB.findByEmail(user.getEmail());
		if (existing) {
			throw new ExpressError({
				message: 'User email already exists',
				data: {},
				status: 'warning',
				statusCode: 409
			});
		}
		if (userInfo.password !== userInfo.confirmPassword) {
			throw new ExpressError({
				message: 'Passwords do not match',
				data: {},
				status: 'warning',
				statusCode: 400
			});
		}
		const created = await userDB.createUser({
			email: user.getEmail(),
			password: user.getPassword(),
			dateOfBirth: user.getDateOfBirth(),
			firstName: user.getFirsName(),
			isActive: user.getIsActive(),
			lastName: user.getLastName(),
			avatar: user.getAvatar()
		});
		const {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			password: _pass,
			role: { name },
			...props
		} = created._doc;

		await UserAccountMailer.sendEmailActivationLink()({
			_id: created._id,
			email: created.email,
			firstName: created.firstName,
			lastName: created.lastName
		});
		return { ...props, role: name };
	};
}
