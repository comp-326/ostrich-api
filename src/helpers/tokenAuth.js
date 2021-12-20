const jwt = require('jsonwebtoken')
// eslint-disable-next-line no-unused-vars
const express = require('express')
const { SECRET_KEY } = require('./../config')

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const verifyAuthToken = async (req, res, next) => {
	try {
		const AuthHeader = req.headers.authorization
		if (!AuthHeader)
			return res.status(401).json({ message: 'No auth header provided' })
		const token = AuthHeader.split(' ')[1]
		// eslint-disable-next-line no-unused-vars
		jwt.verify(token, SECRET_KEY, async (err, payload) => {
			if (err) {
				return res
					.status(403)
					.json({ message: 'Authheader token invalid' })
			}
			req.user = payload
			return next()
		})
	} catch (err) {
		return res.status(500).json({ message: 'Internal server error' })
	}
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const verifyAuthTokenAndAdmin = async (req, res, next) => {
	try {
		verifyAuthToken(req, res, () => {
			if (req.user.role === 'admin') {
				return next()
			}
			return res.status(403).json({ message: 'Not authorized' })
		})
	} catch (err) {
		return res.status(500).json({ message: 'Internal server error' })
	}
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const verifyAuthTokenAndCounselor = async (req, res, next) => {
	try {
		verifyAuthToken(req, res, () => {
			if (req.user.role === 'counselor') {
				return next()
			}
			return res.status(403).json({ message: 'Not authorized' })
		})
	} catch (err) {
		return res.status(500).json({ message: 'Internal server error' })
	}
}
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const verifyAuthTokenAndAdminOrUser = async (req, res, next) => {
	try {
		verifyAuthToken(req, res, () => {
			if (req.user.role === 'admin' || req.user.role === 'user') {
				return next()
			}
			return res.status(403).json({ message: 'Not authorized' })
		})
	} catch (err) {
		return res.status(500).json({ message: 'Internal server error' })
	}
}

module.exports = {
	verifyAuthToken,
	verifyAuthTokenAndAdmin,
	verifyAuthTokenAndCounselor,
	verifyAuthTokenAndAdminOrUser,
}
