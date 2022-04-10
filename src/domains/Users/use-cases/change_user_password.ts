import { ExpressError } from "@base/src/common/errors/ExpressError"
import createUser from "../entities"
import { IUser, IUserRepository } from "../interfaces"

export default function makeEditUserPasswordUseCase({
	userDB,
}: {
	userDB: IUserRepository
}) {
	return async function editUserUserPasswordUseCase(email: string, data: IUser) {
		if (!email) {
			throw new ExpressError("Please provide your email", 400)
		}
		
		const existing = await userDB.findByEmail(email)
		if (!existing) {
			throw new ExpressError("User account does not exist", 404)
		}
		const user = createUser({ ...existing, ...data })
		const edited = await userDB.updateById(existing._id, {
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

		return { ...existing._doc, ...edited }
	}
}
