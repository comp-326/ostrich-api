/* eslint-disable no-unused-vars */
const express = require('express')
// const jwt = require('jsonwebtoken')
const { emptyWorkspaceNameInput } = require('../helpers/form.helper')
const Standout = require('../models/standout.model')
const { verifyAuthTokenAndAdmin } = require('./../helpers/tokenAuth')
const User = require('./../models/user.model')
const Workspace = require('./../models/workspace.model')

//Router constants

const router = express.Router()

router.get('/workspaces', verifyAuthTokenAndAdmin, async (req, res) => {
	try {
		const workspaces = await Workspace.find()
		if (!workspaces.length)
			return res.status(404).json({ message: 'Workspaces not found' })
		return res.status(200).json({ message: 'success', workspaces })
	} catch (err) {
		return res.status(500).json({ message: 'Internal server error' })
	}
})

//Create standout

router.get(
	'/standouts/create/new',
	verifyAuthTokenAndAdmin,
	async (req, res) => {
		try {
			const newStandout = new Standout({
				author: req.user.userId,
			})
		} catch (err) {
			return res.status(500).json({ message: 'Internal server error' })
		}
	},
)

//Create Staff

router.get(
	'/standouts/create/new',
	verifyAuthTokenAndAdmin,
	async (req, res) => {
		try {
			const newStaff = new User({
				author: req.user.userId,
			})
		} catch (err) {
			return res.status(500).json({ message: 'Internal server error' })
		}
	},
)
//Create intake

router.get(
	'/standouts/create/new',
	verifyAuthTokenAndAdmin,
	async (req, res) => {
		try {
			const newIntake = new User({
				author: req.user.userId,
			})
		} catch (err) {
			return res.status(500).json({ message: 'Internal server error' })
		}
	},
)
module.exports = router
