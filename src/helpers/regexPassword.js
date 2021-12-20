/**
 *
 * @param {string} password
 */
async function regexPassword(password) {
	console.log('here')
	const errors = []

	if (!password.match(/[a-z]+/)) {
		errors.push('Password must contain at least 1 lowwercase letter')
	}
	if (!password.match(/[A-Z]+/)) {
		errors.push('Password must contain at least 1 uppercase letter')
	}
	if (!password.match(/[0-9]+/)) {
		errors.push('Password must contain at least 1 number')
	}
	if (password.length < 8) {
		errors.push('Password must contain at least 8 characters')
	}
	if (!password.match(/[~`!@#$%&*()[\]-_+=?/\\{}]/)) {
		errors.push('Password must contain at least 1 special characters eg (~`!@#$%&*()[]-_+=?/\\{}])')
	}

	console.log('Errors', errors)

	if (errors.length) {
		return { error: true, errors }
	}
	return { error: false, errors }
}

module.exports = regexPassword
