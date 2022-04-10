import { ExpressError } from "@base/src/common/errors/ExpressError"
import { IUserRepository } from "../interfaces"

export default function makeRequestAccountActivation({
	userDB,
}: {
	userDB: IUserRepository
}) {
	return async function requestAccountActivation(email: string) {
		if (!email) {
			throw new ExpressError("Id required", 400)
		}
		const existing = await userDB.findByEmail(email)

		if (!existing) {
			throw new ExpressError("User account does not exist not found", 404)
		}
		if (existing.isActive) {
			throw new ExpressError("User account is already active", 400)
		}
		return existing
	}
}
