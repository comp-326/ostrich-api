const passwordRegex = async (password: string) => {
	const errors: string[] = []
	if (!password.match(/[a-z]+/)) {
		errors.push('Password must contain at least one lowercase letter')
	}
	if (!password.match(/[A-Z]+/)) {
		errors.push('Password must contain at least one uppercase letter')
	}
	if (!password.match(/[0-9]+/)) {
		errors.push('Password must contain at number')
	}

	if (!password.match(/[~!@#$%^&*()?.\\,]+/)) {
		console.log('Passed here')

		errors.push(
			'Password must contain at least one special caharacters ~!@#$%^&*()?.\\,',
		)
	}
	if (!(password.length >= 8)) {
		errors.push('Password must contain at least 8 characters')
	}
	if (errors.length) {
		return { error: true, errors }
	}
	return { error: false, errors }
}

export default passwordRegex