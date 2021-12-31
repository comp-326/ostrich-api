/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response, NextFunction } from 'express'
import User from './../../model/User.model'
import ErrorResponse from './../../middlewares/error'
import Workspace from './../../model/Workspace.model'
import { RequestType } from './types'

export const createWorkspace = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	try {
		console.log(req.user)

		const newWorkspace = new Workspace({
			...req.body,
			owner: req?.user.userId,
		})
		const savedWorkspace = await newWorkspace.save()
		return res
			.status(200)
			.json({ success: true, workspace: savedWorkspace })
	} catch (error) {
		return next(error)
	}
}
export const deleteWorkspace = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	// try {
	return res.status(200).json({ message: 'Register' })
}
export const addWorkspaceStaff = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	try {
		const workspaceId = req.params.workspaceId
		if (!workspaceId)
			throw new ErrorResponse('No workspace id provided', 400)
		const workspace = await Workspace.findById(workspaceId)
		if (!workspace!.active)
			throw new ErrorResponse('Workspace is disabled', 403)
		const newStaff = new User({
			...req.body,
			role: req.body.role,
		})
		const savedStaff = await newStaff.save()
		if (req.body.role === 'admin') {
			await workspace?.updateOne({
				$push: { members: savedStaff._id, admins: savedStaff._id },
			})
		}
		if (req.body.role === 'creator') {
			await workspace!.updateOne({
				$push: { members: savedStaff._id, creators: savedStaff._id },
			})
		}
	} catch (error) {
		return next(error)
	}
}
export const register = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	// try {
	return res.status(200).json({ message: 'Register' })
	// } catch (e) {
	// next(e)
	// }
}
export const createWorkspaceBilling = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	// try {
	return res.status(200).json({ message: 'Register' })
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
	return res.status(200).json({ message: 'Uploading constent' })
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
	return res.status(200).json({ message: 'Register' })
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
		if (!workspace) throw new ErrorResponse('Workspace invalid', 400)
		//create email snippet for sending
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
	return res.status(200).json({ message: 'Register' })
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
		return res.status(200).json({ message: 'Register' })
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
	return res.status(200).json({ message: 'Register' })
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
	return res.status(200).json({ message: 'Register' })
	// } catch (e) {
	// next(e)
	// }
}

export const switchWorkspaceOwnership = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	// try {
	return res.status(200).json({ message: 'Register' })
	// } catch (e) {
	// next(e)
	// }
}
