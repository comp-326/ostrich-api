/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FolderModel, UserModel, WorkspaceModel } from "./../models/index"
import { NextFunction, Response } from "express"
import { IRequest } from "./../types/request.d"
class Folder {
	createFolder = async (req: IRequest, res: Response, next: NextFunction) => {
		try {
			const { ownerId, workspaceId } = req.params
			if (!(ownerId && workspaceId)) {
				return res.status(400).json({
					success: false,
					errorMesssage: "Workspace and owner id required",
				})
			}
			const user = await UserModel.findById(ownerId)
			const folder = await FolderModel.create({ ...req.body, owner: user!._id })
			if (folder) {
				const workspace = await WorkspaceModel.findById(workspaceId)

				await workspace.updateOne({ $push: { folders: folder._id } })
				return res
					.status(200)
					.json({ success: true, message: "Folder creation successful" })
			}
			return res
				.status(200)
				.json({ success: false, message: "Folder creation failed" })
		} catch (error) {
			return next(error)
		}
	}
	copyFolder = async (req: IRequest, res: Response, next: NextFunction) => {
		try {
			// const {folderId,destination}=req.params
			const folder = await FolderModel.findById(req.params.folderId)
			if (folder) {
				const workspace = await WorkspaceModel.findById(req.body.workspaceId)

				await workspace.updateOne({ $push: { folders: folder._id } })
				return res
					.status(200)
					.json({ success: true, message: "Folder creation successful" })
			}
			return res
				.status(200)
				.json({ success: false, message: "Folder creation failed" })
		} catch (error) {
			return next(error)
		}
	}
	deleteFolder = async (req: IRequest, res: Response, next: NextFunction) => {
		try {
			const { workspaceId, folderId } = req.params
			const folder = await FolderModel.findById(folderId)
			if (folder) {
				const workspace = await WorkspaceModel.findById(workspaceId)
				await workspace.updateOne({ $pull: { folders: folder._id } })
				await folder.deleteOne()
				return res
					.status(200)
					.json({ success: true, message: "Folder deletion successful" })
			}
			return res
				.status(200)
				.json({ success: false, message: "Folder deletion failed" })
		} catch (error) {
			return next(error)
		}
	}
	duplicateFolder = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const { workspaceId, folderId } = req.body
			const folder = await FolderModel.findById(folderId)
			const folderCopy = await FolderModel.create({ ...folder })
			if (folder && folderCopy) {
				const workspace = await WorkspaceModel.findByIdAndUpdate(workspaceId, {
					$push: { folders: folderCopy },
				})

				await workspace.updateOne({ $push: { folders: folder._id } })
				return res
					.status(200)
					.json({ success: true, message: "Folder creation successful" })
			}
			return res
				.status(200)
				.json({ success: false, message: "Folder creation failed" })
		} catch (error) {
			return next(error)
		}
	}
	updateFolder = async (req: IRequest, res: Response, next: NextFunction) => {
		try {
			const { folderId } = req.params
			const folder = await FolderModel.findById(folderId)
			if (folder) {
				await folder.updateOne({ ...req.body })
				return res
					.status(200)
					.json({ success: true, message: "Folder update successful" })
			}
			return res
				.status(200)
				.json({ success: false, message: "Folder update failed" })
		} catch (error) {
			return next(error)
		}
	}
	moveFolder = async (req: IRequest, res: Response, next: NextFunction) => {
		try {
			const { sourceId, destinationId } = req.body
			if (!(sourceId && destinationId)) {
				return res.status(400).json({
					success: false,
					errorMessage: "Source and destination must be provided",
				})
			}
			const folder = await FolderModel.findById(req.params.folderId)
			if (folder) {
				const workspace = await WorkspaceModel.findById(req.body.workspaceId)

				await workspace.updateOne({ $push: { folders: folder._id } })
				return res
					.status(200)
					.json({ success: true, message: "Folder creation successful" })
			}
			return res
				.status(200)
				.json({ success: false, message: "Folder creation failed" })
		} catch (error) {
			return next(error)
		}
	}
}

export default Folder
