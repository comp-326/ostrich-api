import { ExpressError } from "@base/src/common/errors/ExpressError"
import { IPassword, IUser, IUserValidator } from "../interfaces"

export default function makeCreateUserEntity({
	validator,
	passwordUtil,
}: {
	validator: IUserValidator
	passwordUtil: IPassword
}) {
	return function createUser({
		dateOfBirth,
		email,
		firstName,
		lastName,
		password,
	}: IUser) {
		const { isValidEmail, isValidPassword } = validator
		const { hashPassword } = passwordUtil
		let newPassword = password
		if (!isValidEmail(email)) {
			throw new ExpressError("Please provide a valid email", 400)
		}
		if (!firstName) {
			throw new ExpressError("First name required", 400)
		}
		if (!lastName) {
			throw new ExpressError("Last name required", 400)
		}
		if (password.length < 30) {
			const { ok, errors } = isValidPassword({
				props: { firstName, lastName, password },
				fields: [
					{ fieldName: "firstName", name: "First name" },
					{ fieldName: "email", name: "Email address" },
					{ fieldName: "lastName", name: "Last name" },
				],
			})
			if (!ok) {
				throw new ExpressError(errors, 400)
			}
		}
		if (password && password.length < 30)
			hashPassword(password)
				.then((res) => (newPassword = res))
				.catch((err) => {
					console.log(err.message)
				})

		const activationToken = { value: "", used: true }
		const profile = { public_id: "", url: "string" }
		return Object.freeze({
			getFirsName: () => firstName,
			getLastName: () => lastName,
			getDateOfBirth: () => dateOfBirth,
			getActivationToken: () => activationToken,
			getIsActive: () => false,
			getPasswordToken: () => activationToken,
			getRole: () => "User",
			getProfilePicture: () => profile,
			getPassword: () => newPassword,
			getEmail: () => email,
		})
	}
}
