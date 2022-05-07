/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { INext, IRequest, IResponse } from '@ostrich-app-common/types';
import { IServicesController, IServicesUseCases } from '../interfaces';

class ServicesController implements IServicesController{
	constructor(private useCase: IServicesUseCases){ }

	updateService = async (req: IRequest, res: IResponse, next: INext) => {
		return res.status(200).json({ working: 'OK' });
	};

	/**
	 * Brief desc
	 * @summary Summary
	 * @param {IRequest} req Default express req obj
	 * @param {IResponse} res - Default express res obj
	 * @param {INext} next - Next middleware
	 * @return {IResponse|INext} Brief description of the returning value here.
	 */
	softDelete = async (req: IRequest, res: IResponse, next: INext) => {
		await this.useCase.addServices(req.body);

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
	findServicess = async (req: IRequest, res: IResponse, next: INext) => {
		return res.status(200).json({ Servicess: true });
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
	findWorkspaceServicess = async (req: IRequest, res: IResponse, next: INext) => {
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
	createServices = async (req: IRequest, res: IResponse, next: INext) => {
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
	copyServices = async (req: IRequest, res: IResponse, next: INext) => {
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
	updateServices = async (req: IRequest, res: IResponse, next: INext) => {
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
	moveServices = async (req: IRequest, res: IResponse, next: INext) => {
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
	hardDeleteServices = async (req: IRequest, res: IResponse, next: INext) => {
		return { deleting: true };
	};
}

export default ServicesController;
