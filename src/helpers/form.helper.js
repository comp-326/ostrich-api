// eslint-disable-next-line no-unused-vars
const express = require('express')
const regexPassword = require('./regexPassword')

/*----------------------------------- USERS--------------------------- */
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const emptyEmailInput = async (req, res, next) => {
	const { email } = req.body
	if (!email) return res.status(400).json({ message: 'Email field required' })
	return next()
}
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const emptyFirstNameInput = async (req, res, next) => {
	const { firstName } = req.body
	if (!firstName)
		return res.status(400).json({ message: 'First name field required' })
	return next()
}
// EMPTY LAST NAME FIELD
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const emptyLastNameInput = async (req, res, next) => {
	const { lastName } = req.body
	if (!lastName)
		return res.status(400).json({ message: 'Last name field required' })
	return next()
}
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const emptyPasswordInput = async (req, res, next) => {
	const { password } = req.body
	if (!password)
		return res.status(400).json({ message: 'Password field required' })
	return next()
}
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const confirmPassword = async (req, res, next) => {
	const { password, confirmPassword } = req.body
	if (!(password === confirmPassword))
		return res.status(400).json({ message: 'Passwords do not match' })
	return next()
}
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const passwordRegex = async (req, res, next) => {
	const { password } = req.body
	const { error, errors } = await regexPassword(password)
	if (error) return res.status(400).json({ message: errors })
	return next()
}
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const emailRegex = async (req, res, next) => {
	const { email } = req.body
	const regex = RegExp(
		/^[a-zA-Z-+_.]+[a-zA-Z0-9]*@[a-zA-Z0-9.]+([a-zA-Z]*)$/,
		'g',
	)
	if (email.search(regex) < 0)
		return res.status(400).json({ message: 'Invalid email address' })
	return next()
}

/*--------------------------- WORKSPACE -------------------------------------- */
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const emptyWorkspaceNameInput = async (req, res, next) => {
	const { name } = req.body
	if (!name)
		return res
			.status(400)
			.json({ message: 'Workspace name field required' })
	return next()
}
/*--------------------------- Plans -------------------------------------- */
/*--------------------------- Takeout -------------------------------------*/
/*--------------------------- Intake --------------------------------------*/
/*--------------------------- Staff intake --------------------------------*/

module.exports = {
	emptyEmailInput,
	emptyFirstNameInput,
	emptyLastNameInput,
	emptyPasswordInput,
	confirmPassword,
	passwordRegex,
	emailRegex,
	emptyWorkspaceNameInput,
}
