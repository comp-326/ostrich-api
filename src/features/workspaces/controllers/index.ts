/* eslint-disable @typescript-eslint/no-explicit-any */
import { INext, IRequest, IResponse } from '@ostrich-app/common/types';
import {
	IWorkspaceController,
	IWorkspaceUseCases
} from '@ostrich-app/features/workspaces/interfaces';
import { NextFunction } from 'express';

class FolderController implements IWorkspaceController{
	constructor(private useCase: IWorkspaceUseCases){}
	hardDeleteWorkspace: (
		req: IRequest,
		res: IResponse,
		next: NextFunction
	) => Promise<any>;
	/**
	 * Brief desc
	 * @summary Summary
	 * @param {IRequest} req Default express req obj
	 * @param {IResponse} res - Default express res obj
	 * @param {INext} next - Next middleware
	 * @return {IResponse|INext} Brief description of the returning value here.
	 */
	findWorkspaces: (
		req: IRequest,
		res: IResponse,
		next: NextFunction
	) => Promise<any>;

	/**
	 * Brief desc
	 * @summary Summary
	 * @param {IRequest} req Default express req obj
	 * @param {IResponse} res - Default express res obj
	 * @param {INext} next - Next middleware
	 * @return {IResponse|INext} Brief description of the returning value here.
	 */
	findWorkspaceWorkspaces=async (
		req: IRequest,
		res: IResponse,
		next: NextFunction
	) => {
		await this.useCase.listWorkspaceWorkspaces(req.params.workspaceId as any);
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
	createWorkspace: (
		req: IRequest,
		res: IResponse,
		next: NextFunction
	) => Promise<any>;

	/**
	 * Brief desc
	 * @summary Summary
	 * @param {IRequest} req Default express req obj
	 * @param {IResponse} res - Default express res obj
	 * @param {INext} next - Next middleware
	 * @return {IResponse|INext} Brief description of the returning value here.
	 */
	copyWorkspace: (
		req: IRequest,
		res: IResponse,
		next: NextFunction
	) => Promise<any>;
	
	/**
	 * Brief desc
	 * @summary Summary
	 * @param {IRequest} req Default express req obj
	 * @param {IResponse} res - Default express res obj
	 * @param {INext} next - Next middleware
	 * @return {IResponse|INext} Brief description of the returning value here.
	 */
	updateWorkspace: (
		req: IRequest,
		res: IResponse,
		next: NextFunction
	) => Promise<any>;

	/**
	 * Brief desc
	 * @summary Summary
	 * @param {IRequest} req Default express req obj
	 * @param {IResponse} res - Default express res obj
	 * @param {INext} next - Next middleware
	 * @return {IResponse|INext} Brief description of the returning value here.
	 */
	moveWorkspace: (
		req: IRequest,
		res: IResponse,
		next: NextFunction
	) => Promise<any>;

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
	findFolders = async (req: IRequest, res: IResponse, next: INext) => {
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
	findWorkspaceFolders = async (req: IRequest, res: IResponse, next: INext) => {
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
	createFolder = async (req: IRequest, res: IResponse, next: INext) => {
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
	copyFolder = async (req: IRequest, res: IResponse, next: INext) => {
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
	updateFolder = async (req: IRequest, res: IResponse, next: INext) => {
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
	moveFolder = async (req: IRequest, res: IResponse, next: INext) => {
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
	hardDeleteFolder = async (req: IRequest, res: IResponse, next: INext) => {
		return { deleting: true };
	};
}

export default FolderController;
