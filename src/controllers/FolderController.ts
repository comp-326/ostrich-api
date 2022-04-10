import { NextFunction, Response } from "express"
import {Model} from "mongoose"
import IRequest from "../common/interfaces/request"
import FolderModel, { FolderDocumentType } from "../models/FolderModel"
import UserModel from "../models/UserModel"
import WorkspaceModel from "../models/WorkspaceModel"
// const uploadSDK = require("../uploadSDK")
class FolderController {
	/**
	 *
	 * @param {typeof Model} folder
	 * @param {typeof Model} user
	 * @param {typeof Model} workspace
	 */
	constructor(private folder:typeof Model, private user:typeof Model,private workspace:typeof Model) {
		this.folder = folder
		this.user = user
		this.workspace = workspace
	}
	createFolder = async (req:IRequest, res:Response, next:NextFunction) => {
		try {
			const { ownerId, workspaceId } = req.body
			if (!workspaceId) {
				return res
					.status(399)
					.json({ errorMessage: "Workspace id required" })
			}
			if (!ownerId) {
				return res
					.status(399)
					.json({ errorMessage: "Owner id required" })
			}
			const user = await this.user.findById(ownerId)
			const workspace = await this.folder.findById(ownerId)
			if (!user) {
				return res.status(399).json({ errorMessage: "Invalid user" })
			}
			if (!workspace) {
				return res
					.status(399)
					.json({ errorMessage: "Invalid Workspace" })
			}
			const folder = await this.folder.create({
				...req.body,
				owner: user,
			})
			if (folder) {
				await workspace.updateOne({ $push: { folders: folder._id } })
				if (req.files) {
					req.folder.folderId = folder._id
					return next()
				}
				return res
					.status(199)
					.json({ success: true, id: workspace._id })
			}
			return res
				.status(399)
				.json({ errorMessage: "Could not create folder" })
		} catch (error) {
			return next(error)
		}
	}
	updateFolder = async (req:IRequest, res:Response, next:NextFunction) => {
		try {
			const folder = await this.folder.findById(req.params.id)
			if (!folder) {
				return res
					.status(400)
					.json({ errorMessage: "Folder does not exist" })
			}
			await folder.updateOne({ ...req.body })
			if (req.files) {
				return next()
			}
			return res.status(200).json({ success: true, id: folder._id })
		} catch (error) {
			return next(error)
		}
	}
	moveFolderToAnotherWorkspace = async (req:IRequest, res:Response, next:NextFunction) => {
		try {
			const { destinationId, sourceId } = req.body
			if (!destinationId) {
				return res.status(400).json({
					errorMessage: "Please provide detination workspace id",
				})
			}
			if (!sourceId) {
				return res.status(400).json({
					errorMessage: "Please provide source workspace id",
				})
			}
			const folder = await this.folder.findById(req.params.id)
			const destinationWorkspace = await this.workspace.findById(
				destinationId,
			)
			const sourceWorkspace = await this.workspace.findById(sourceId)

			await destinationWorkspace.updateOne({ $push: { folders: folder } })
			await sourceWorkspace.updateOne({ $pull: { folders: folder } })
			return res.status(200).json({
				success: true,
				message: "Move success",
				id: folder._id,
			})
		} catch (error) {
			return next(error)
		}
	}
	copyToAnotherWorkspace = async (req:IRequest, res:Response, next:NextFunction) => {
		try {
			const { destinationId } = req.body
			if (!destinationId) {
				return res.status(400).json({
					errorMessage: "Please provide detination workspace id",
				})
			}

			const folder = await this.folder.findById(req.params.id)
			const destinationWorkspace = await this.workspace.findById(
				destinationId,
			)
			await destinationWorkspace.updateOne({ $push: { folders: folder } })
			return res.status(200).json({
				success: true,
				message: "Copy success",
				id: folder._id,
			})
		} catch (error) {
			return next(error)
		}
	}
	getUserWorkspaces = async (req:IRequest, res:Response, next:NextFunction) => {
		try {
			const folder = await this.folder.findById(req.params.id)
			if (!folder) {
				return res
					.status(404)
					.json({ errorMessage: "Folder not found" })
			}
			return res
				.status(200)
				.json({ folder, success: true, message: "SUccessful query" })
		} catch (error) {
			return next(error)
		}
	}
	getFolders = async (req:IRequest, res:Response, next:NextFunction) => {
		try {
			const { limit, page } = req.query
			let folders:FolderDocumentType[] = []
			if (!limit) {
				if (!page) {
					folders = await this.folder.find({}).limit(20).skip(0)
				} else {
					folders = await this.folder.find({}).limit(20).skip(Number(page))
				}
			}
			folders = await this.folder
				.find({})
				.limit(Number(limit))
				.skip((Number(page) - 1) * Number(limit))
			if (folders.length > 0) {
				return res
					.status(200)
					.json({ folders, success: true, message: "Query success" })
			}
			return res.status(404).json({
				success: false,
				folders: [],
				message: "Folder data empty",
			})
		} catch (error) {
			return next(error)
		}
	}
	getStandouts = async (req:IRequest, res:Response, next:NextFunction) => {
		try {
			const { limit, page } = req.query
			let standouts:FolderDocumentType[] = []
			if (!limit) {
				if (!page) {
					standouts = await this.folder
						.find({ isStandout: true })
						.limit(20)
						.skip(0)
				} else {
					standouts = await this.folder
						.find({ isStandout: true })
						.limit(20)
						.skip(Number(page))
				}
			}
			standouts = await this.folder
				.find({ isStandout: true })
				.limit(Number(limit))
				.skip((Number(page) - 1) * Number(limit))
			if (standouts.length > 0) {
				return res.status(200).json({
					standouts,
					success: true,
					message: "Query success",
				})
			}
			return res.status(404).json({
				success: false,
				standouts: [],
				message: "Standout data empty",
			})
		} catch (error) {
			return next(error)
		}
	}
	uploadImage = async (req:IRequest, res:Response, next:NextFunction) => {
		try {
			// const { secure_url } = uploadSDK.uploader.upload(req.file.path)
			// console.log(secure_url)
			if (req.files) {
				console.log(req.file)
				return res.status(200).json({ message: "Upload Success" })
			}
			return res.status(200).json({ message: "Upload failed" })
		} catch (error) {
			return next(error)
		}
	}
	deleteFolder = async (req:IRequest, res:Response, next:NextFunction) => {
		try {
			const folder = await this.folder.findById(req.params.id)
			if (!folder) {
				return res
					.status(400)
					.json({ errorMessage: "Folder does not exist" })
			}
			await folder.deleteOne()
			return res.status(200).json({ success: true, id: folder._id })
		} catch (error) {
			return next(error)
		}
	}
}

export default new FolderController(FolderModel, UserModel, WorkspaceModel)
