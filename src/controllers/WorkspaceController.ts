/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NextFunction, Response } from "express"
import { Model } from "mongoose"
import IRequest from "../common/interfaces/request"
import { EMAIL_ACCOUNT } from "../config"
import { createWorkspaceInviteLink } from "../constants/CreateLink"
import passwordUtils from "../helpers/password"
import random from "../helpers/random"
import { mailTransport } from "../mail"
import templates from "../mail/templates"
import RoleModel from "../models/RoleModel"
import UserModel, { UserDocumentType } from "../models/UserModel"
import WorkspaceModel, { WorkspaceDocumentType } from "../models/WorkspaceModel"

class WorkspaceController {
	/**
	 * Applying model injection to the class to query from within
	 */
	/**
	 *
	 * @param {Model} workspace
	 * @param {Model} user
	 * @param {Model} role
	 */
	constructor(
		private workspace: typeof Model,
		private user: typeof Model,
		private role: typeof Model,
	) {}
	/**
	 ****************** CREATE WORKSPACE *******************
	 * @param {express.Request} req
	 * @param {express.Response} res
	 * @param {express.NextFunction} next
	 * @returns
	 */
	createWorkspace = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const { name, type } = req.body
			let wType = ""
			let wName = ""
			if (!name) {
				return res.status(400).json("Workspace name required")
			}
			if (!type) {
				wType = "personal"
			}
			if (
				!(type === "personal") ||
				!(type === "education") ||
				!(type === "business")
			) {
				wType = "personal"
			}
			const workspace = await this.workspace.findOne({ name })
			wName = name
			if (workspace) {
				wName = `${name}_${String(new Date().getTime()).slice(5)}`
				console.log("Name", wName)
			}
			console.log("Out", wName)
			const newWorkspace = new this.workspace({
				...req.body,
				name: wName,
				type: wType,
				owner: req.user.userId,
			})
			const savedWorkspace = await newWorkspace.save()
			if (savedWorkspace) {
				await savedWorkspace.updateOne({
					$push: {
						members: req.user.userId,
						admins: req.user.userId,
					},
				})
				return res
					.status(200)
					.json({ message: "Successs", id: savedWorkspace._id })
			}
			return res.status(400).json("Could not create workspace")
		} catch (error) {
			return next(error)
		}
	}
	/**
	 ****************** USER REGISTER VIA LINK ***************
	 * @param {express.Request} req
	 * @param {express.Response} res
	 * @param {express.NextFunction} next
	 * @returns
	 */
	userRegisterViaLink = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const { role, w_space } = req.params
			let workspaceRole = role
			if (!role) {
				workspaceRole = "member"
			}
			if (!w_space) {
				return res.status(400).json("Ivalid workspace invite url")
			}

			const hpass = await passwordUtils.hashPass(String(req.body.password))
			req.body.password = hpass

			const defaultRole = await this.role.findOne({ default: true })

			const workspace = await this.workspace.findById(w_space)
			if (!workspace) {
				return res.status(400).json("Invalid workspace details")
			}
			const newUser = new this.user({ ...req.body, role: defaultRole })
			const savedUser = await newUser.save()
			if (workspaceRole.toLowerCase() === "admin") {
				await workspace.updateOne(
					{
						$push: {
							members: savedUser._id,
							admins: savedUser._id,
						},
					},
					{ new: true },
				)
			} else if (workspaceRole.toLowerCase() === "creator") {
				await workspace.updateOne(
					{
						$push: {
							members: savedUser._id,
							creator: savedUser._id,
						},
					},
					{ new: true },
				)
			} else if (workspaceRole.toLowerCase() === "creator_lite") {
				await workspace.updateOne(
					{
						$push: {
							members: savedUser._id,
							creatorLites: savedUser._id,
						},
					},
					{ new: true },
				)
			} else {
				await workspace.updateOne(
					{ $push: { members: savedUser._id } },
					{ new: true },
				)
			}
			return res.status(200).json({
				message: "Account created successfully",
				id: savedUser._id,
			})
		} catch (error) {
			return next(error)
		}
	}
	/**
	 **************** CREATE WORKSPACE MEMBER *****************
	 * @param {express.Request} req
	 * @param {express.Response} res
	 * @param {express.NextFunction} next
	 * @returns
	 */
	createWorkspaceMember = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			let emailSent = false
			const { role, workspaceId } = req.body
			let workspaceRole = role
			if (!role) {
				workspaceRole = "member"
			}
			if (!workspaceId) {
				return res.status(400).json("Workspace id required")
			}
			const { firstName, lastName, email } = req.body
			if (!firstName) {
				return res.status(400).json("First name required")
			}
			if (!email) {
				return res.status(400).json("Email required")
			}
			if (!lastName) {
				return res.status(400).json("Last name required")
			}

			const user = <UserDocumentType>(
				await (<unknown>this.user.findOne({ email }))
			)
			if (user) {
				return res.status(400).json("User email already registered")
			}
			const userPassword = random(12)
			const hpass = await passwordUtils.hashPass(String(userPassword))
			req.body.password = hpass

			const defaultRole = await this.role.findOne({ default: true })

			const workspace = await this.workspace.findById(workspaceId)
			if (!workspace) {
				return res.status(400).json("Invalid workspace details")
			}
			const newUser = new this.user({
				...req.body,
				isActive: true,
				role: defaultRole,
			})
			const savedUser = await newUser.save()
			if (workspaceRole.toLowerCase() === "admin") {
				await workspace.updateOne(
					{
						$push: {
							members: savedUser._id,
							admins: savedUser._id,
						},
					},
					{ new: true },
				)
			} else if (workspaceRole.toLowerCase() === "creator") {
				await workspace.updateOne(
					{
						$push: {
							members: savedUser._id,
							creator: savedUser._id,
						},
					},
					{ new: true },
				)
			} else if (workspaceRole.toLowerCase() === "creator_lite") {
				await workspace.updateOne(
					{
						$push: {
							members: savedUser._id,
							creatorLites: savedUser._id,
						},
					},
					{ new: true },
				)
			} else {
				await workspace.updateOne(
					{ $push: { members: savedUser._id } },
					{ new: true },
				)
			}
			/**
			 * ***************************  SEND EMAIL TO THE USER **********************
			 */
			// const temp = WorkspaceIntakeInviteTempexport default transporter
			const template = templates.WorkspaceTeamMemberTemp({
				email,
				firstName,
				lastName,
				password: userPassword!,
			})
			const w_Owner = await this.user.findById(req.user?.userId).select("email")
			try {
				const res = await mailTransport.sendMail({
					to: email,
					from: EMAIL_ACCOUNT,
					encoding: "utf-8",
					html: template,
					subject: "Workspace member collaboration",
					replyTo: w_Owner.email,
					date: new Date().toDateString(),
				})
				res && (emailSent = true)
			} catch (err) {
				err && (emailSent = false)
			}
			if (emailSent) {
				return res.status(200).json({
					message:
						"Account created successfully and Email sent to the member email",
					id: savedUser._id,
				})
			}
			return res.status(200).json({
				message: "Account created successfully but could not send email",
				id: savedUser._id,
			})
		} catch (error) {
			return next(error)
		}
	}
	/**
	 ******************** CHANGE USER WORKSPACE ROLE ************
	 * @param {express.Request} req
	 * @param {express.Response} res
	 * @param {express.NextFunction} next
	 * @returns
	 */
	changeWorkspaceUserRole = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const { role, userId, workspaceId } = req.body
			if (!role) {
				return res.status(400).json("Please provide the new role")
			}
			if (!workspaceId) {
				return res.status(400).json("Please provide the workspace id")
			}
			if (!userId) {
				return res.status(400).json("Please provide user details")
			}
			const workspace = await this.workspace
				.findById(workspaceId)
				.populate("members")
				.populate("admins")
				.populate("creators")
				.populate("creatorLites")
			if (role.toLowerCase() === "admin") {
				if (
					workspace.creatorLites.some(function (
						user: Partial<UserDocumentType>,
					) {
						return user._id === userId
					})
				) {
					await workspace.updateOne({
						$pull: { creatorLites: { $in: [userId] } },
					})
				}
				if (
					workspace.creators.some(
						(user: Partial<UserDocumentType>) => user._id === userId,
					)
				) {
					await workspace.updateOne({
						$pull: { creators: { $in: [userId] } },
					})
				}
				if (
					workspace.admins.some(
						(user: Partial<UserDocumentType>) => user._id === userId,
					)
				) {
					return res.status(400).json("User already an admin")
				}
				await workspace.updateOne({ $push: { admins: userId } })
				return res.status(200).json("New role assigned")
			}
			if (role.toLowerCase() === "creator") {
				if (
					workspace.admins.some(
						(user: Partial<UserDocumentType>) => user._id === userId,
					)
				) {
					await workspace.updateOne({
						$pull: { creatorLites: { $in: [userId] } },
					})
				}
				if (
					workspace.creatorLites.some(
						(user: Partial<UserDocumentType>) => user._id === userId,
					)
				) {
					await workspace.updateOne({
						$pull: { creatorLites: { $in: [userId] } },
					})
				}
				if (
					workspace.creators.some(
						(user: Partial<UserDocumentType>) => user._id === userId,
					)
				) {
					return res.status(400).json("User already a creator")
				}
				await workspace.updateOne({ $push: { creators: userId } })
				return res.status(200).json("New role assigned")
			}
			if (role.toLowerCase() === "creator_lite") {
				if (
					workspace.admins.some(
						(user: Partial<UserDocumentType>) => user._id === userId,
					)
				) {
					await workspace.updateOne({
						$pull: { admins: { $in: [userId] } },
					})
				}
				if (
					workspace.creators.some(
						(user: Partial<UserDocumentType>) => user._id === userId,
					)
				) {
					await workspace.updateOne({
						$pull: { creators: { $in: [userId] } },
					})
				}
				if (
					workspace.creatorLites.some(
						(user: Partial<UserDocumentType>) => user._id === userId,
					)
				) {
					return res.status(400).json("User already a creator lite")
				}
				await workspace.updateOne({ $push: { admins: userId } })
				return res.status(200).json("New role assigned")
			}
			return res.status(400).json("Could not assign role")
		} catch (error) {
			return next(error)
		}
	}
	/**
	 ******************* UPDATE USER WORKSPACE ******************
	 * @param {express.Request} req
	 * @param {express.Response} res
	 * @param {express.NextFunction} next
	 * @returns
	 */
	updateWorkspace = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const workspace = await this.workspace.findByIdAndUpdate(
				req.params.id,
				{ ...req.body },
				{ new: true },
			)
			if (workspace) {
				return res
					.status(200)
					.json({ message: "Update success", id: workspace._id })
			}
			return res.status(400).json("Could not update")
		} catch (error) {
			return next(error)
		}
	}
	/**
	 ******************** GET USERS TO WHICH A USER IS A MEMBER *******
	 * @param {express.Request} req
	 * @param {express.Response} res
	 * @param {express.NextFunction} next
	 * @returns
	 */
	getUserWorkspaces = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const { userId } = req.user
			const workspaces = await this.workspace
				.find({
					members: { $in: [userId] },
				})
				.select("name type")
			if (workspaces.length > 0) {
				return res.status(200).json({ success: true, workspaces })
			}
			return res.status(404).json({ success: false, workspaces: [] })
		} catch (error) {
			return next(error)
		}
	}
	/**
	 ****************** SEND USER INVITATION LINKS TO REGISTER *********
	 * @param {express.Request} req
	 * @param {express.Response} res
	 * @param {express.NextFunction} next
	 * @returns
	 */
	inviteUsersToWorkspace = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const { emails, role } = req.body
			if (!role) {
				return res.status(400).json("Please provide user role")
			}
			const emailAddresses = emails.split(",")
			const link = createWorkspaceInviteLink({
				role,
				workspaceId: req.params.id,
			})
			/***
			 * ********************  SEND EMAIL TO THE INTENDED EMAILS **********************
			 */
			return res.status(200).json({ link, emailAddresses })
		} catch (error) {
			return next(error)
		}
	}
	/**
	 ************************ GET ALL WORKSPACES WITH PAGINATION ***************
	 * @param {express.Request} req
	 * @param {express.Response} res
	 * @param {express.NextFunction} next
	 * @returns
	 */
	getAllWorkspaces = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const { limit, page } = req.query
			let workspaces:WorkspaceDocumentType[] = []
			if (limit) {
				/**
				 * ****************  LIMIT && NOT PAGE
				 */
				if (!page) {
					workspaces = await this.workspace
						.find(
							{},
							{
								id: 1,
								name: 1,
								date_created: { $month: "$createdAt" },
								number_of_members: { $size: "$members" },
								number_of_creators: { $size: "$creators" },
								number_of_creator_lites: {
									$size: "$creatorLites",
								},
								year_created: { $year: "$createdAt" },
							},
							{ count: { $size: "allDocuments" } },
						)
						.skip(0)
						.limit(Number(limit))
						.populate("members", "firstName lastName -_id email")
						.populate("admins", "firstName lastName -_id email")
						.populate("creators", "firstName lastName -_id email")
						.populate("creatorLites", "firstName lastName -_id email")
				} else {
					/**
					 * ******************** LIMIT AND PAGE ******************
					 */
					workspaces = await this.workspace
						.find(
							{},
							{
								id: 1,
								name: 1,
								date_created: { $month: "$createdAt" },
								number_of_members: { $size: "$members" },
								number_of_creators: { $size: "$creators" },
								number_of_creator_lites: {
									$size: "$creatorLites",
								},
								year_created: { $year: "$createdAt" },
							},
							{ count: { $size: "allDocuments" } },
						)
						.skip((Number(page) - 1) * Number(limit))
						.limit(Number(limit))
						.populate("members", "firstName lastName -_id email")
						.populate("admins", "firstName lastName -_id email")
						.populate("creators", "firstName lastName -_id email")
						.populate("creatorLites", "firstName lastName -_id email")
				}
			} else {
				/**
				 * *********************** NOT LIMIT AND PAGE
				 */
				if (page) {
					workspaces = await this.workspace
						.find(
							{},
							{
								id: 1,
								name: 1,
								date_created: { $month: "$createdAt" },
								number_of_members: { $size: "$members" },
								number_of_creators: { $size: "$creators" },
								number_of_creator_lites: {
									$size: "$creatorLites",
								},
								year_created: { $year: "$createdAt" },
							},
							{ count: { $size: "allDocuments" } },
						)
						.skip(Number(page))
						.limit(5)
						.populate("members", "firstName lastName -_id email")
						.populate("admins", "firstName lastName -_id email")
						.populate("creators", "firstName lastName -_id email")
						.populate("creatorLites", "firstName lastName -_id email")
				} else {
					/**
					 * **************** NOT LIMIT AND NOT PAGE
					 */
					workspaces = await this.workspace
						.find(
							{},
							{
								id: 1,
								name: 1,
								date_created: { $month: "$createdAt" },
								number_of_members: { $size: "$members" },
								number_of_creators: { $size: "$creators" },
								number_of_creator_lites: {
									$size: "$creatorLites",
								},
								year_created: { $year: "$createdAt" },
							},
							{ count: { $size: "allDocuments" } },
						)
						.skip(0)
						.limit(3)
						.populate("members", "firstName lastName -_id email")
						.populate("admins", "firstName lastName -_id email")
						.populate("creators", "firstName lastName -_id email")
						.populate("creatorLites", "firstName lastName -_id email")
				}
			}
			if (workspaces.length > 0) {
				return res.status(200).json({
					workspaces,
					success: true,
					message: "Query success",
				})
			}
			return res.status(404).json({
				success: false,
				workspaces: [],
				message: "Standout data empty",
			})
		} catch (error) {
			return next(error)
		}
	}
	/**
	 ********************** GET INDIVIDUAL WORKSPACE DETAILS ********************
	 * @param {express.Request} req
	 * @param {express.Response} res
	 * @param {express.NextFunction} next
	 * @returns
	 */
	getWorkspaceById = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const workspace = await this.workspace
				.findById(req.params.id, {
					date_created: { $month: "$createdAt" },
					number_of_members: { $size: "$members" },
					number_of_creators: { $size: "$creators" },
					number_of_creator_lites: { $size: "$creatorLites" },
					year_created: { $year: "$createdAt" },
				})
				.populate("owner", "email firstName -_id lastName")
				.populate("members", "firstName lastName -_id email")
				.populate("admins", "firstName lastName -_id email ")
				.populate("creators", "firstName lastName -_id email ")
				.populate("creatorLites", "firstName lastName -_id email")
			if (workspace) {
				return res.status(200).json({
					success: true,
					message: "Query success",
					workspace,
				})
			}
			return res.status(400).json({
				success: false,
				message: "Query failed",
				workspace: null,
			})
		} catch (error) {
			return next(error)
		}
	}
}

export default new WorkspaceController(WorkspaceModel, UserModel, RoleModel)
