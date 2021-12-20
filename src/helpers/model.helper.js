// eslint-disable-next-line no-unused-vars
const express = require('express')
const User = require('../models/user.model')

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const userEmailExist = async (req, res, next) => {
	const { email } = req.body
	const user = await User.findOne({ email })
	if (user)
		return res.status(409).json({ message: 'User email already exist' })
	return next()
}

module.exports = { userEmailExist }
