/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICommentsController, ICommentsUseCases } from '../interfaces';
import { INext, IRequest, IResponse } from '@ostrich-app/common/types';

class CommentsController implements ICommentsController{
	constructor(private useCase: ICommentsUseCases){}

	/**
	 * Brief desc
	 * @summary Summary
	 * @param {IRequest} req Default express req obj
	 * @param {IResponse} res - Default express res obj
	 * @param {INext} next - Next middleware
	 * @return {IResponse|INext} Brief description of the returning value here.
	 */
	softDelete = async (req: IRequest, res: IResponse, next: INext) => {
		await this.useCase.addComments(req.body);

		return res.status(200).json({
			message: 'softDelete'
		});
	};

	/**
	 * Brief desc
	 * @summary Summary
	 * @param {IRequest} req Default express req obj
	 * @param {IResponse} res - Default express res obj
	 * @param {INext} next - Next middleware
	 * @return {IResponse|INext} Brief description of the returning value here.
	 */
	findCommentss = async (req: IRequest, res: IResponse, next: INext) => {
		return res.status(200).json({ Commentss: true });
	};

	/**
	 * Brief desc
	 * @summary Summary
	 * @param {IRequest} req Default express req obj
	 * @param {IResponse} res - Default express res obj
	 * @param {INext} next - Next middleware
	 * @return {IResponse|INext} Brief description of the returning value here.
	 */
	findById = async (req: IRequest, res: IResponse, next: INext) => {
		return res.status(200).json({ finding: true });
	};

	/**
	 * Brief desc
	 * @summary Summary
	 * @param {IRequest} req Default express req obj
	 * @param {IResponse} res - Default express res obj
	 * @param {INext} next - Next middleware
	 * @return {IResponse|INext} Brief description of the returning value here.
	 */
	findByName = async (req: IRequest, res: IResponse, next: INext) => {
		return res.status(200).json({ finding: true });
	};

	/**
	 * Brief desc
	 * @summary Summary
	 * @param {IRequest} req Default express req obj
	 * @param {IResponse} res - Default express res obj
	 * @param {INext} next - Next middleware
	 * @return {IResponse|INext} Brief description of the returning value here.
	 */
	findWorkspaceCommentss = async (req: IRequest, res: IResponse, next: INext) => {
		return res.status(200).json({ finding: true });
	};

	/**
	 * Brief desc
	 * @summary Summary
	 * @param {IRequest} req Default express req obj
	 * @param {IResponse} res - Default express res obj
	 * @param {INext} next - Next middleware
	 * @return {IResponse|INext} Brief description of the returning value here.
	 */
	createComments = async (req: IRequest, res: IResponse, next: INext) => {
		return res.status(200).json({ creating: true });
	};

	/**
	 * Brief desc
	 * @summary Summary
	 * @param {IRequest} req Default express req obj
	 * @param {IResponse} res - Default express res obj
	 * @param {INext} next - Next middleware
	 * @return {IResponse|INext} Brief description of the returning value here.
	 */
	copyComments = async (req: IRequest, res: IResponse, next: INext) => {
		return res.status(200).json({ copied: true });
	};

	/**
	 * Brief desc
	 * @summary Summary
	 * @param {IRequest} req Default express req obj
	 * @param {IResponse} res - Default express res obj
	 * @param {INext} next - Next middleware
	 * @return {IResponse|INext} Brief description of the returning value here.
	 */
	updateComments = async (req: IRequest, res: IResponse, next: INext) => {
		return res.status(200).json({ updated: true });
	};

	/**
	 * Brief desc
	 * @summary Summary
	 * @param {IRequest} req Default express req obj
	 * @param {IResponse} res - Default express res obj
	 * @param {INext} next - Next middleware
	 * @return {IResponse|INext} Brief description of the returning value here.
	 */
	moveComments = async (req: IRequest, res: IResponse, next: INext) => {
		return res.status(200).json({ moved: true });
	};

	/**
	 * Brief desc
	 * @summary Summary
	 * @param {IRequest} req Default express req obj
	 * @param {IResponse} res - Default express res obj
	 * @param {INext} next - Next middleware
	 * @return {IResponse|INext} Brief description of the returning value here.
	 */
	hardDeleteComments = async (req: IRequest, res: IResponse, next: INext) => {
		return { deleting: true };
	};
}

export default CommentsController;
