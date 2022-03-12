/* eslint-disable @typescript-eslint/no-unused-vars */
import { WorkspaceModel } from "./../models/index"
import { IWorkspaceDocument } from "./../models/types/Workspace.d"
import { NextFunction, Response } from "express"
import { IRequest } from "./../types/request.d"
class Workspace {
	createWorkspace = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const workspace = <IWorkspaceDocument>(
				await (<unknown>WorkspaceModel.create({
					...req.body,
					owner: req.user.userId,
				}))
			)
			if (workspace) {
				await workspace.updateOne(
					{
						$push: { admins: req.user.userId, members: req.user.userId },
					},
					{ new: true },
				)
				return res
					.status(200)
					.json({
						success: true,
						id: workspace._id,
						mesage: "Creation success",
					})
			}
		} catch (error) {
			console.log(error.message)

			return next(error)
		}
	}
	updateWorkspace = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const workspace = await WorkspaceModel.findByIdAndUpdate(req.params.id, {
				...req.body,
			})
			if (workspace) {
				return res
					.status(200)
					.json({ success: true, message: "Update success", id: workspace._id })
			}
			return res
				.status(500)
				.json({ sucess: false, message: "Could not locate workspace" })
		} catch (error) {
			return next(error)
		}
	}
	updateWorkspaceSettings = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const { settings } = req.body
			const workspace = await WorkspaceModel.findByIdAndUpdate(
				req.params.id,
				{
					settings: { ...settings },
				},
				{ new: true },
			)
			if (workspace) {
				await workspace.deleteOne()
				return res.status(200).json({
					success: true,
					message: "Workspace settings updated successfully",
				})
			}
			return res.status(404).json({
				success: false,
				message: "Workspace settings could not be updated or located",
			})
		} catch (error) {
			return next(error)
		}
	}
	deleteWorkspace = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const workspace = await WorkspaceModel.findById(req.params.id)
			if (workspace) {
				await workspace.deleteOne()
				return res
					.status(200)
					.json({ success: true, message: "Workspace deleted successfully" })
			}
			return res.status(404).json({
				success: false,
				message: "Workspace could not be deleted or located",
			})
		} catch (error) {
			return next(error)
		}
	}
	getWorkspaceAnalytics = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const workspacesData = await (<unknown>WorkspaceModel.aggregate([
				{
					$match: {
						members: { $gte: 0 },
						admins: { $gte: 0 },
						creators: { $gte: 0 },
					},
					$group: { _id: "$members", members: { $sum: 1 } },
				},
			]))
			return res.status(200).json({ workspacesData })
		} catch (error) {
			return next(error)
		}
	}
	getWorkspaceById = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const workspace = await WorkspaceModel.findById(req.params.workspaceId)

			if (workspace) {
				return res
					.status(200)
					.json({ success: true, message: "Query success", workspace })
			}
			return res
				.status(200)
				.json({ success: true, message: "Query success", workspace: null })
		} catch (error) {
			return next(error)
		}
	}
	getAllWorkspaces = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const workspaces = await WorkspaceModel.find({}).limit(100)

			if (workspaces.length > 0) {
				return res
					.status(200)
					.json({ success: true, message: "Query success", workspaces })
			}
			return res
				.status(200)
				.json({ success: true, message: "Query success", workspaces: [] })
		} catch (error) {
			return next(error)
		}
	}
	getUserWorkspaces = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const { userId } = req.user
			const workspaces = await WorkspaceModel.find({
				members: { $in: [userId] },
			})

			if (workspaces.length > 0) {
				return res
					.status(200)
					.json({ success: true, message: "Query success", workspaces })
			}
			return res.status(404).json({
				success: true,
				message: "You are not in any workspace",
				workspaces: [],
			})
		} catch (error) {
			return next(error)
		}
	}
	disableWorkspace = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const workspace = await WorkspaceModel.findByIdAndUpdate(
				req.params.id,
				{ active: false },
				{ new: true },
			)
			if (workspace) {
				return res
					.status(200)
					.json({ success: true, message: "Workspace disabled successfully" })
			}
			return res.status(400).json({
				success: true,
				message: "Workspace could not be disabled successfully",
			})
		} catch (error) {
			return next(error)
		}
	}
}

export default Workspace
