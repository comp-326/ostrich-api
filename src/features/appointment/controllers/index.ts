/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppointmentController, IAppointmentUseCases } from '../interfaces';
import { INext, IRequest, IResponse } from '@ostrich-app-common/types';

class AppointmentController implements IAppointmentController{
	constructor(private useCase: IAppointmentUseCases){}

	/**
	 * Brief desc
	 * @summary Summary
	 * @param {IRequest} req Default express req obj
	 * @param {IResponse} res - Default express res obj
	 * @param {INext} next - Next middleware
	 * @return {IResponse|INext} Brief description of the returning value here.
	 */
	softDelete = async (req: IRequest, res: IResponse, next: INext) => {
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
	findAppointments = async (req: IRequest, res: IResponse, next: INext) => {
		return res.status(200).json({ folders: true });
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
		await this.useCase.listAppointmentById(req.body);

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
	findWorkspaceAppointments = async (req: IRequest, res: IResponse, next: INext) => {
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
	createAppointment = async (req: IRequest, res: IResponse, next: INext) => {
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
	copyAppointment = async (req: IRequest, res: IResponse, next: INext) => {
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
	updateAppointment = async (req: IRequest, res: IResponse, next: INext) => {
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
	moveAppointment = async (req: IRequest, res: IResponse, next: INext) => {
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
	hardDeleteAppointment = async (req: IRequest, res: IResponse, next: INext) => {
		return { deleting: true };
	};
}

export default AppointmentController;
