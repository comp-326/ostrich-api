import bcryptjs from "bcryptjs"
import { IPassword } from "../interfaces"
class Password implements IPassword{
	/**
	 *
	 * @param {string} password
	 */
	hashPassword = async (password: string) => {
		const salt = await bcryptjs.genSalt(12)
		const h_pass = await bcryptjs.hash(password, salt)
		return h_pass
	}
	/**
	 *
	 * @param {string} password
	 * @param {string} passwordHash
	 * @returns
	 */
	comparePassword = async (password: string, passwordHash: string) => {
		const match = await bcryptjs.compare(password, passwordHash)
		return match
	}
}

export default new Password()
