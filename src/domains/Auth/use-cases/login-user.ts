import { ExpressError } from "@base/src/common/errors/ExpressError"
import { IAuthRepository } from "../interfaces"

export default function makeLoginUserByUseCase({
	userDB,
}: {
	userDB: IAuthRepository
}) {
	return async function loginUserUseCase(email: string, password: string) {
		if (!email) {
			throw new ExpressError("Email required", 400)
		}
		if (!password) {
			throw new ExpressError("Password required", 400)
		}
		const existing = await userDB.findByEmail(email)
		if (!existing) {
			throw new ExpressError("User not found", 404)
		}
		return existing
	}
}
