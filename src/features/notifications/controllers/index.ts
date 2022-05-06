/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { INext, IRequest, IResponse } from '@ostrich-app/common/types';
import { INotificationController, INotificationUseCases } from '../interfaces';

class NotificationController implements INotificationController{
	constructor(private useCase: INotificationUseCases){}

	/**
	 * Brief desc
	 * @summary Summary
	 * @param {IRequest} req Default express req obj
	 * @param {IResponse} res - Default express res obj
	 * @param {INext} next - Next middleware
	 * @return {IResponse|INext} Brief description of the returning value here.
	 */
	softDelete = async (req: IRequest, res: IResponse, next: INext) => {
		await this.useCase.addNotification(req.body);
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
	findNotifications = async (req: IRequest, res: IResponse, next: INext) => {
		return res.status(200).json({ Notifications: true });
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
	findWorkspaceNotifications = async (req: IRequest, res: IResponse, next: INext) => {
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
	createNotification = async (req: IRequest, res: IResponse, next: INext) => {
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
	copyNotification = async (req: IRequest, res: IResponse, next: INext) => {
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
	updateNotification = async (req: IRequest, res: IResponse, next: INext) => {
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
	moveNotification = async (req: IRequest, res: IResponse, next: INext) => {
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
	hardDeleteNotification = async (req: IRequest, res: IResponse, next: INext) => {
		return { deleting: true };
	};
}

export default NotificationController;
