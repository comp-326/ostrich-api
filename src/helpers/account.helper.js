// eslint-disable-next-line no-unused-vars
const express = require('express')
const User = require('../models/user.model')

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const ExistingAccount = async (req, res, next) => {
	const { email } = req.body
	const user = await User.findOne({ email })
	if (!user)
		return res.status(401).json({
			message: 'Please create an account to login',
		})
	return next()
}
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const ActiveAccount = async (req, res, next) => {
	const { email } = req.body
	const user = await User.findOne({ email })
	if (!user.active)
		return res.status(401).json({ message: 'Please activate your account' })
	return next()
}

module.exports = { ExistingAccount, ActiveAccount }
