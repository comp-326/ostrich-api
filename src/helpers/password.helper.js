const bcrypt = require('bcryptjs')

/**
 *
 * @param {string} hashedPassword
 * @param {string} password
 */
const comparePassword = async (password, hashedPassword) => {
	const equal = await bcrypt.compare(password, hashedPassword)
	return equal
}
/**
 *
 * @param {number} saltLength
 * @param {string} password
 */
const hashPassword = async (password, saltLength = 10) => {
	const salt = await bcrypt.genSalt(saltLength)
	const hashedpassword = await bcrypt.hash(password, salt)
	return hashedpassword
}

module.exports = { comparePassword, hashPassword }
