const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('./../models/user.model')
const {
	emptyEmailInput,
	emptyFirstNameInput,
	emptyLastNameInput,
	emptyPasswordInput,
	passwordRegex,
	confirmPassword,
	emailRegex,
} = require('../helpers/form.helper')
const { hashPassword, comparePassword } = require('../helpers/password.helper')
const { userEmailExist } = require('../helpers/model.helper')
const { SECRET_KEY, PORT, BASE_URL, API_VERSION } = require('../config')
const { ExistingAccount, ActiveAccount } = require('../helpers/account.helper')

//Router constants

const router = express.Router()

/* CREATE ACCOUNT */
router.post(
	'/register',
	emptyEmailInput,
	userEmailExist,
	emptyFirstNameInput,
	emptyLastNameInput,
	emptyPasswordInput,
	passwordRegex,
	confirmPassword,
	async (req, res) => {
		try {
			const hashedPassword = await hashPassword(req.body.password)
			const newUser = User({
				...req.body,
				role: 'user',
				accountType: 'basic',
				password: hashedPassword,
			})
			const savedUser = await newUser.save()
			// eslint-disable-next-line no-unused-vars
			const { password, ...props } = savedUser._doc
			return res.status(200).json({
				message: 'Successfully created account please check your email',
				user: props,
			})
		} catch (err) {
			return res.status(500).json({ message: err.message })
		}
	},
)

/* LOGIN USER */
router.post(
	'/login',
	emptyEmailInput,
	emailRegex,
	emptyPasswordInput,
	ExistingAccount,
	ActiveAccount,
	async (req, res) => {
		try {
			const { email } = req.body
			const user = await User.findOne({ email })
			const passwordMatch = await comparePassword(
				req.body.password,
				user.password,
			)
			if (!passwordMatch)
				return res
					.status(401)
					.json({ message: 'Check your login details' })
			// eslint-disable-next-line no-unused-vars
			const { password, ...props } = user._doc
			const authToken = await jwt.sign(
				{
					userId: user._id,
					role: user.role,
					accountType: user.accountType,
					email: user.email,
				},
				SECRET_KEY,
			)
			return res
				.status(200)
				.json({ message: 'Login successful', user: props, authToken })
		} catch (err) {
			return res.status(500).json({ message: err.message })
		}
	},
)
/**
 * Activate user account
 */
router.get('/activate/account/:token', async (req, res) => {
	try {
		const token = req.params.token
		if (!token)
			return res.status(401).json({ message: 'Invalid acivation link' })
		jwt.verify(token, SECRET_KEY, async (err, user) => {
			if (err)
				return res
					.status(401)
					.json({ message: 'Activation link has expired' })
			// eslint-disable-next-line no-unused-vars
			const dbUser = await User.findByIdAndUpdate(user.userId, {
				active: true,
			})
			if (dbUser.active)
				return res
					.status(400)
					.json({ message: 'Account already acivated' })
			return res.status(200).json({
				message: 'Account acivation succesful proceed to login',
			})
		})
	} catch (err) {
		return res.status(500).json({ message: 'Internal server error' })
	}
})

/**
 * Request new account activation link
 */
router.post(
	'/account/activate/request/link',
	emptyEmailInput,
	ExistingAccount,
	async (req, res) => {
		try {
			const { email } = req.body
			const user = await User.findOne({ email })
			if (user.active)
				return res
					.status(400)
					.json({ message: 'Account already activated' })
			// Should be sent to mail but for now just as a response
			const token = jwt.sign(
				{
					userId: user._id,
					role: user.role,
					accountType: user.accountType,
					email: user.email,
				},
				SECRET_KEY,
				{ expiresIn: '30m' },
			)
			return res.status(200).json({
				message: 'Activation link sent to your email',
				url: `${BASE_URL}:${PORT}/${API_VERSION}/auth/activate/account/${token}`,
				token,
			})
		} catch (err) {
			return res.status(500).json({ message: 'Internal server error' })
		}
	},
)

/**
 * Request reset password
 */
router.post(
	'/account/password/reset/link',
	emptyEmailInput,
	ExistingAccount,
	async (req, res) => {
		try {
			const { email } = req.body
			const user = await User.findOne({ email })
			const token = jwt.sign(
				{
					userId: user._id,
					role: user.role,
					accountType: user.accountType,
					email: user.email,
				},
				SECRET_KEY,
				{ expiresIn: '30m' },
			)
			return res.status(200).json({
				message: 'Reset  link sent to your email',
				url: `${BASE_URL}:${PORT}/${API_VERSION}/auth/account/password/reset/${user._id}/${token}`,
				token,
			})
		} catch (err) {
			return res.status(500).json({ message: 'Internal server error' })
		}
	},
)

/**
 * Reset password
 */
router.post(
	'/account/password/reset/:user_id/:token',
	emptyPasswordInput,
	passwordRegex,
	confirmPassword,
	async (req, res) => {
		try {
			const user_id = req.params.user_id
			const token = req.params.token
			if (!user_id)
				return res
					.status(400)
					.json({ message: 'User id parameter not provided' })
			if (!token)
				return res
					.status(400)
					.json({ message: 'Reset token parameter not provided' })
			// eslint-disable-next-line no-unused-vars
			jwt.verify(token, SECRET_KEY, async (err, _payload) => {
				if (err)
					return res
						.status(401)
						.json({ message: 'Confirmation link has expired' })
				await User.findByIdAndUpdate(
					user_id,
					{ password: await hashPassword(req.body.password) },
					{ new: true },
				)
				return res.status(200).json({
					message: 'Password reset succesful proceed to login',
				})
			})
		} catch (err) {
			return res.status(500).json({ message: 'Internal server error' })
		}
	},
)

module.exports = router
