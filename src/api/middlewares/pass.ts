import bcrypt from 'bcryptjs'

export const confirmPassword = async (
	password: string,
	hashedPassword: string,
) => {
	return await bcrypt.compare(password, hashedPassword)
}

export const hashPassword = async (password: string) => {
	const salt = await bcrypt.genSalt(10)
	return await bcrypt.hash(password, salt)
}
