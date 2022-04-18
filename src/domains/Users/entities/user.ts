import { ExpressError } from '@base/src/common/errors/ExpressError';
import { IPassword, IUser, IUserValidator } from '../interfaces';

export default function makeCreateUserEntity({
	validator,
	passwordUtil
}: {
	validator: IUserValidator;
	passwordUtil: IPassword;
}) {
	return function createUser({
		dateOfBirth,
		email,
		firstName,
		lastName,
		password,
		profilePic
	}: IUser) {
		const { isValidEmail, isValidPassword } = validator;
		const { hashPassword } = passwordUtil;
		let newPassword = password;
		if (!isValidEmail(email)) {
			throw new ExpressError({
				message: 'Please provide a valid email',
				statusCode: 400,
				status: 'warning',
				data: {}
			});
		}
		if (!firstName) {
			throw new ExpressError({
				message: 'First name required',
				data: {},
				statusCode: 400,
				status: 'warning'
			});
		}
		if (!lastName) {
			throw new ExpressError({
				message: 'Last name required',
				data: {},
				status: 'warning',
				statusCode: 400
			});
		}
		if (password.length < 30) {
			const { ok, errors } = isValidPassword({
				props: { firstName, lastName, password },
				fields: [
					{ fieldName: 'firstName', name: 'First name' },
					{ fieldName: 'email', name: 'Email address' },
					{ fieldName: 'lastName', name: 'Last name' }
				]
			});
			if (!ok) {
				throw new ExpressError({
					message: 'Invalid password',
					statusCode: 400,
					data: errors.replace(/[\t]/, '').trim().split(/\n/),
					status: 'warning'
				});
			}
		}
		if (password && password.length < 30)
			hashPassword(password)
				.then(res => (newPassword = res))
				.catch(err => {
					console.log(err.message);
				});

		const activationToken = { value: '', used: true };
		const profile = profilePic ? profilePic : { public_id: '', url: '' };
		return Object.freeze({
			getFirsName: () => firstName,
			getLastName: () => lastName,
			getDateOfBirth: () => dateOfBirth,
			getActivationToken: () => activationToken,
			getIsActive: () => false,
			getPasswordToken: () => activationToken,
			getRole: () => 'User',
			getProfilePicture: () => profile,
			getPassword: () => newPassword,
			getEmail: () => email
		});
	};
}
