/* eslint-disable no-unused-vars */
const express = require('express')
const jwt = require('jsonwebtoken')
const { emptyWorkspaceNameInput } = require('../helpers/form.helper')
const Appointment = require('../models/appointment.model')
const {
	verifyAuthToken,
	verifyAuthTokenAndAdmin,
} = require('./../helpers/tokenAuth')
const User = require('./../models/user.model')
const Workspace = require('./../models/workspace.model')

//Router constants

const router = express.Router()

// Create workspace
router.post(
	'/workspace/create/new',
	verifyAuthToken,
	emptyWorkspaceNameInput,
	async (req, res) => {
		try {
			const { name } = req.body
			const decoded = jwt.decode(req.headers.authorization.split(' ')[1])
			const user = await User.findById(decoded.userId)
			if (decoded.role === 'user' && user.workspaces.length >= 1)
				return res.status(403).json({
					message:
						'Please upgrade your ostrich premium package to create more',
				})
			const newWorkspace = new Workspace({
				owner: user._id,
				name: name,
			})
			const createdWorkspace = await newWorkspace.save()
			await user.update(
				{ $push: { workspaces: createdWorkspace._id } },
				{ new: true },
			)
			const { password, ...props } = user._doc
			return res.status(200).json({
				message: 'Success',
				user: props,
				workspace: createdWorkspace,
			})
		} catch (err) {
			return res
				.status(500)
				.json({ message: 'Internal server error', err: err.message })
		}
	},
)
// All User workspaces
/**
 * A method to query all user workspaces or
 * User available workspaces or workspaces owned by a user
 */
router.get('/workspaces', verifyAuthToken, async (req, res) => {
	try {
		const validUser = req.user
		const user = await User.findById(validUser.userId)
		const workspaces = await Workspace.find({
			$or: [
				{ owner: user._id },
				{ members: { $in: [...user.workspaces] } },
			],
		})
		if (workspaces.length < 1)
			return res.status(404).json({ message: 'No workspaces found' })
		return res.status(200).json({ message: 'Success', workspaces })
	} catch (err) {
		return res.status(500).json({ message: 'Internal server error' })
	}
})
// Inividual workspace
/**
 * method to query single workspace using workspace Id
 */
router.get(
	'/workspaces/:userId/:workspaceId',
	verifyAuthToken,
	async (req, res) => {
		try {
			const { userId, workspaceId } = req.params
			if (!userId)
				return res.status(400).json({ message: 'Invalid user Id' })
			if (!workspaceId)
				res.status(400).json({ message: 'Invalid workspace Id' })
			const workspace = await Workspace.findById(workspaceId)
			if (!workspace)
				return res.status(404).json({ message: 'Workspace not found' })
			return res.status(200).json({ message: 'Success', workspace })
		} catch (err) {
			return res.status(500).json({ message: 'Internal server error' })
		}
	},
)

// Inividual workspace
/**
 * Invite user to a workspace
 */
router.get(
	'/workspaces/:userId/:workspaceId/invite',
	verifyAuthToken,
	async (req, res) => {
		try {
			const { workspaceId } = req.params
			const workspace = await Workspace.findById(workspaceId)
			if (!workspace)
				return res.status(400).json({ message: 'Invalid workspace id' })
			const { userEmail, invitedMails } = req.body
			return res
				.status(200)
				.json({ message: `Inviting User to ${workspace.name}` })
		} catch (err) {
			return res.status(500).json({ message: 'Internal server error' })
		}
	},
)

/**
 * Comment on
 */
router.get(
	'/workspaces/:userId/:workspaceId/folder',
	verifyAuthToken,
	async (req, res) => {
		try {
			const { workspaceId } = req.params
			const workspace = await Workspace.findById(workspaceId)
			if (!workspace)
				return res.status(400).json({ message: 'Invalid workspace id' })
			const { userEmail, invitedMails } = req.body
			return res
				.status(200)
				.json({ message: `Inviting User to ${workspace.name}` })
		} catch (err) {
			return res.status(500).json({ message: 'Internal server error' })
		}
	},
)

//Create appointment
router.post('/appointments/new', verifyAuthToken, (req, res) => {
	try {
		console.log(req.user)
		const newAppointment = new Appointment({})
		return res.sendStatus(200).json({ message: 'Success Appointment' })
	} catch (err) {
		return res.status(500).json({ message: 'Internal server error' })
	}
})
//Cancel Appointment
router.put('/appointments/cancel/:userId', verifyAuthToken, (req, res) => {
	try {
		console.log(req.user)
		const newAppointment = new Appointment({})
		return res.sendStatus(200).json({ message: 'Canceling appointment' })
	} catch (err) {
		return res.status(500).json({ message: 'Internal server error' })
	}
})
//Create appointment
router.put(
	'/appointments/reschedule/:appointmentId/:userId',
	verifyAuthToken,
	(req, res) => {
		try {
			console.log(req.user)
			const newAppointment = new Appointment({})
			return res
				.sendStatus(200)
				.json({ message: 'Rescheduling appointment' })
		} catch (err) {
			return res.status(500).json({ message: 'Internal server error' })
		}
	},
)

module.exports = router
