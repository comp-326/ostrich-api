/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response, NextFunction } from 'express'
// import ErrorResponse from './../../middlewares/error'
import Comment from './../../model/Comment.model'
import Institution from './../../model/Institution.model'
import Workspace from './../../model/Workspace.model'
import User from './../../model/User.model'
import { RequestType } from './types'
export const createInstitution = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	try {
		const newInstitution = new Institution({
			...req.body,
			author: req.user.userId,
		})
		const savedInstitution = await newInstitution.save()
		await Workspace.findByIdAndUpdate(
			req.params.workspaceId,
			{
				$push: { institutions: savedInstitution },
			},
			{ new: true },
		)
		return res.status(200).json({
			success: true,
			message: 'Institution created succesfully',
			institution: savedInstitution,
		})
	} catch (error) {
		next(error)
	}
}
// Update institution details
export const updateInstitution = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	try {
		const files = req.body.files
		if (files) {
			console.log(files)
		}
		await Institution.findByIdAndUpdate(
			req.params.id,
			{
				...req.body,
			},
			{ new: true },
		)
		return res.status(200).json({
			success: true,
			message: 'Institution updated successfully',
		})
	} catch (error) {
		return next(error)
	}
}
// Write a comment on an institution
export const commentOnInstitution = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	try {
		const institutionId = req.params.institutionId
		const newComment = new Comment({
			comment: req.body.comment,
			author: req.user.userId,
		})
		const savedComment = await newComment.save()
		const commentedInstitution = await Institution.findByIdAndUpdate(
			institutionId,
			{
				$push: { comments: savedComment },
			},
			{ new: true },
		)

		return res.status(200).json({
			success: true,
			institution: commentedInstitution,
		})
	} catch (e) {
		next(e)
	}
}

// Like an institution
export const likeInstitution = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	try {
		const institutionId = req.params.institutionId
		const inLikes = await User.find({
			$and: [
				{ _id: req.user.userId },
				{ likedInstitutions: { $in: [institutionId] } },
			],
		})

		if (inLikes.length > 0) {
			return res
				.status(400)
				.json({ success: false, message: 'Already liked institution' })
		}
		const institution = await Institution.findByIdAndUpdate(
			institutionId,
			{
				$inc: { likes: 1 },
			},
			{ new: true },
		)
		await User.findByIdAndUpdate(
			req.user.userId,
			{
				$push: { likedInstitutions: institutionId },
			},
			{ new: true },
		)
		return res.status(200).json({ success: true, institution })
	} catch (error) {
		return next(error)
	}
}
export const rateInstitution = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	return res.status(200).json({ message: 'Rating institution' })
}
