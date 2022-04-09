import { ExpressError } from "@common/errors/ExpressError"
import validateMongodbId from "@utils/mongo/ObjectId-validator"
import createTodo from "../entities"
import { IUser, IUserRepository } from "../interfaces"

export default function makeEditActivateUserUseCase({
	userDB,
}: {
	userDB: IUserRepository
}) {
	return async function editActivateUserUserUseCase(id: string, data: IUser) {
		if (!id) {
			throw new ExpressError("Please provide an id", 400)
		}
		if (!validateMongodbId(id)) {
			throw new ExpressError("Please provide a valid user id", 400)
		}
		const existing = await userDB.findById(id)
		if (!existing) {
			throw new ExpressError("User does not exist", 404)
		}
		if (existing.isActive) {
			throw new ExpressError("User account already activated", 400)
		}
		const user = createTodo({ ...existing, ...data })
		const edited = await userDB.updateById(id, {
			email: user.getEmail(),
			password: user.getPassword(),
			activationToken: user.getActivationToken(),
			dateOfBirth: user.getDateOfBirth(),
			firstName: user.getFirsName(),
			isActive: true,
			lastName: user.getLastName(),
			passToken: user.getPasswordToken(),
			profilePic: user.getProfilePicture(),
		})

		return { ...existing._doc, ...edited }
	}
}
