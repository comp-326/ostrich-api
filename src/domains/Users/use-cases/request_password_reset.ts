import { ExpressError } from "@base/src/common/errors/ExpressError"
import { IUserRepository } from "../interfaces"

export default function makeRequestPasswordReset({
	userDB,
}: {
	userDB: IUserRepository
}) {
	return async function requestPasswordReset(email: string) {
		if (!email) {
			throw new ExpressError("Id required", 400)
		}
		const existing = await userDB.findByEmail(email)
		if (!existing) {
			throw new ExpressError("User account does not exist not found", 404)
		}
		return existing
	}
}
