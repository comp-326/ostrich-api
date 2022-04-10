import { ExpressError } from "@base/src/common/errors/ExpressError"
import { IUserRepository } from "../interfaces"

export default function makeListUserByEmail({
	userDB,
}: {
	userDB: IUserRepository
}) {
	return async function listUserByEmailUseCase(email: string) {

		if (!email) {
			throw new ExpressError("Id required",400)
		}
		const existing = await userDB.findByEmail(email)
		if (!existing) {
			throw new ExpressError("Todo not found",404)
		}
		return existing
	}
}
