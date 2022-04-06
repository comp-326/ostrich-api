import { ExpressError } from "@base/src/common/errors/ExpressError"
import createUser from "../entities"
import { IUser, IAuthRepository } from "../interfaces"

export default function makeRegisterUserUseCase({
	userDB,
}: {
	userDB: IAuthRepository
}) {
	return async function registerUserUseCase(userInfo: IUser) {
		const user = await createUser(userInfo)
		const existing = await userDB.findByEmail(user.getEmail())
		if (existing) {
			throw new ExpressError("User email already exist", 400)
		}
		// const password =
		const created = await userDB.createUser({
			email: user.getEmail(),
			password: user.getPassword(),
			activationToken: user.getActivationToken(),
			dateOfBirth: user.getDateOfBirth(),
			firstName: user.getFirsName(),
			isActive: user.getIsActive(),
			lastName: user.getLastName(),
			passToken: user.getPasswordToken(),
			profilePic: user.getProfilePicture(),
		})
		return created
	}
}
