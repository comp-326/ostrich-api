import bcrypt from 'bcryptjs'

class Password {
	generatePasswordHash = async (
		passwordString: string,
		saltLength = 10,
	): Promise<string> => {
		const salt = await bcrypt.genSalt(saltLength)
		const password = await bcrypt.hash(passwordString, salt)
		return password
	}

	// Compare
	comparePasswordHash = async (
		passwordString: string,
		hashedPassword: string,
	) => {
		return await bcrypt.compare(passwordString, hashedPassword)
	}
}

export default new Password()
