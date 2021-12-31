/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response, NextFunction } from 'express'
// import ErrorResponse from './../../middlewares/error'
import Comment from './../../model/Comment.model'
import Institution from './../../model/Institution.model'
import { RequestType } from './types'
export const createInstitution = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	

	return res.status(200).json({
		success: true,
		message: 'Institution created succesfully',
	})
	// } catch (e) {
	// 	next(e)
	// }
}
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
export const commentOnInstitution = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	try {
		const institutionId = req.params.institutionId
		const newComment = new Comment({
			content: req.body.body,
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
			institution: commentedInstitution?.populate(''),
		})
	} catch (e) {
		next(e)
	}
}
export const likeInstitution = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	try {
		const institutionId = req.params.institutionId
		const institution = await Institution.findByIdAndUpdate(
			institutionId,
			{
				$inc: { likes: 1 },
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
	return res.status(200).json({ message: 'Register' })
}
