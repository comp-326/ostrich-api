/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response, NextFunction } from "express"
import User from "../../Models/User.model"
import ErrorResponse from "../../Middlewares/error"
import Workspace from "../../Models/Workspace.model"
import { RequestType } from "./types"
import { UserRoles } from "../../constants/roles"
import { mailTransport } from "../Cservices/Mail.service"
import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../../config"
import Message from "./../../Models/WorkspaceMessageTemplate.model"

export const createWorkspace = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	try {
		const newWorkspace = new Workspace({
			...req.body,
			owner: req?.user.userId,
		})
		const savedWorkspace = await newWorkspace.save()
		await savedWorkspace.updateOne(
			{
				$push: { members: req.user.userId, admins: req.user.userId },
			},
			{ new: true },
		)
		const user = await User.findByIdAndUpdate(req.user.userId, {
			firstTimeSignOn: false,
		})
		return res
			.status(200)
			.json({ success: true, user, workspace: savedWorkspace })
	} catch (error) {
		return next(error)
	}
}
// Delete personal workspace
export const deleteWorkspace = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	// try {
	return res.status(200).json({ message: "Register" })
}
export const addWorkspaceStaff = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	try {
		const workspaceId = req.params.workspaceId
		if (!workspaceId) throw new ErrorResponse("No workspace id provided", 400)
		const workspace = await Workspace.findById(workspaceId)
		if (!workspace!.active)
			throw new ErrorResponse("Workspace is disabled", 403)
		const newStaff = new User({
			...req.body,
			role: req.body.role,
		})
		const savedStaff = await newStaff.save()
		if (req.body.role === UserRoles.admin) {
			await workspace?.updateOne({
				$push: { members: savedStaff._id, admins: savedStaff._id },
			})
		}
		if (req.body.role === UserRoles.creator) {
			await workspace!.updateOne({
				$push: { members: savedStaff._id, creators: savedStaff._id },
			})
		}
	} catch (error) {
		return next(error)
	}
}
export const getWorkspace = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	try {
		const workspace = await Workspace.findOne({ owner: req.user.userId })
			.populate(
				"admins",
				"firstName role lastName createdAt updatedAt isActive",
			)
			.populate(
				"counselors",
				"firstName role lastName createdAt updatedAt isActive",
			)
			.populate(
				"members",
				"firstName role lastName createdAt updatedAt isActive",
			)
			.populate("institutions")
		if (!workspace) {
			return next(new ErrorResponse("No workspace found", 404))
		}
		return res.status(200).json({ workspace, success: true })
	} catch (err) {
		return next(err)
	}
}
// Create your workspace billing
export const createWorkspaceBilling = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	// try {
	return res.status(200).json({ message: "Register" })
	// } catch (e) {
	// next(e)
	// }
}

export const uploadContent = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	// try {
	return res.status(200).json({ message: "Uploading constent" })
	// } catch (e) {
	// next(e)
	// }
}
export const monitorWorkspaceBilling = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	// try {
	return res.status(200).json({ message: "Register" })
	// } catch (e) {
	// next(e)
	// }
}
export const inviteUserToWorkspace = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	try {
		const workspaceId = req.params.workspaceId
		const userEmail = req.body.email
		const workspace = await Workspace.findById(workspaceId)
		if (!workspace) throw new ErrorResponse("Workspace invalid", 400)
		//create email snippet for sending
		mailTransport.sendMail({
			to: userEmail,
			subject: "Invitation to join Ostrich platform workspace",
			date: new Date().toUTCString(),
			html: `
			<h1>Please click the link below to join workspace</h1>

			<a href="http://localhost:3000/auth/workspace/:workspaceId/join/${jwt.sign(
				{
					refereeId: req.user.userId,
					role: "user",
					workspaceId,
				},
				SECRET_KEY!,
				{ expiresIn: "1d" },
			)}">Accept invitation</a>
			`,
		})
		return res.status(200).json({
			message: `Email invitation has been sent to ${userEmail}`,
			success: true,
		})
	} catch (e) {
		next(e)
	}
}

export const manageUserInWorkspace = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	// try {
	return res.status(200).json({ message: "Register" })
	// } catch (e) {
	// next(e)
	// }
}

export const createIntakes = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	try {
		// const
		return res.status(200).json({ message: "Create intake" })
	} catch (e) {
		next(e)
	}
}
export const workspaceRequestUpgrade = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	// try {
	return res.status(200).json({ message: "Register" })
	// } catch (e) {
	// next(e)
	// }
}
export const downgradeWorkspaceUser = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	// try {
	return res.status(200).json({ message: "Register" })
	// } catch (e) {
	// next(e)
	// }
}

// Verify if user has correct invitation link
export const verifyWorkspaceInvitation = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	try {
		const InvitationToken = req.params.token
		if (!InvitationToken) {
			throw new ErrorResponse("Invalid invitation", 400)
		}

		return jwt.verify(InvitationToken, SECRET_KEY!, async (err, payload) => {
			if (err) {
				return res.status(401).json({
					success: false,
					message: "Invitation has expired",
				})
			}
			req.invitation = payload
			return next()
		})
	} catch (e) {
		next(e)
	}
}
// Accept workspace invitation
export const acceptWorkspaceInvitation = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	try {
		const newUser = await User.create({
			...req.body,
			role: UserRoles.user,
		})
		// Add the user to the requested workspace
		await Workspace.findByIdAndUpdate(req.invitation.workspaceId, {
			$push: { members: newUser._id },
		})
		// Add the reference to the user referrals
		await User.findByIdAndUpdate(req.invitation.refereeId, {
			$push: { referrals: newUser._id },
		})
		// Unselect password from the query
		const { password, ...props } = newUser
		return res.status(200).json({
			success: true,
			message:
				"Registration successful please chechk your email to confirm your account",
			user: props,
		})
	} catch (error) {
		next(error)
	}
}
// User workspaces
export const userWorkspace = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	try {
		const workspace = await Workspace.findOne({
			owner: req.user.userId,
		})
			.populate("members")
			.populate("admins")
			.populate("institutions")
			.populate("creators")
			.populate("creator_lite")
		if (!workspace) {
			return res.status(404).json({
				success: true,
				message: "No workspace available",
			})
		}
		return res.status(200).json({
			success: false,
			workspace,
		})
	} catch (e) {
		next(e)
	}
}

export const createWorkspaceMessage = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { title, template }: { title: string; template: string } = req.body
		if (!title) {
			return next(new ErrorResponse("Please provide message title", 400))
		}
		if (!template) {
			return next(new ErrorResponse("Please provide message body", 400))
		}

		const message = await Message.create({
			...req.body,
			workspace: req.body.workspaceId,
			author: req.user.userId,
		})
		if (message) {
			await Workspace.findOneAndUpdate(req.body.workspaceId, {
				$push: { messages: message._id },
			})
			return res.status(200).json({ success: true, message })
		}
	} catch (err) {
		return next(err)
	}
}
export const updateMessage = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	try {
		const message = await Message.findByIdAndUpdate({
			...req.body,
		})
		if (message) {
			return res.status(200).json({ success: true, message })
		}
	} catch (err) {
		return next(err)
	}
}
