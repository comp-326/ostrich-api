/* eslint-disable @typescript-eslint/no-explicit-any */
import { IFolderController,IFolderUseCases } from '../interfaces';
import { INext, IRequest, IResponse } from '@ostrich-app/common/types';

class FolderController implements IFolderController{
	constructor(private useCase:IFolderUseCases){}
	/**
	 * Brief desc
	 * @summary Summary
	 * @param {IRequest} req Default express req obj
	 * @param {IResponse} res - Default express res obj
	 * @param {INext} next - Next middleware
	 * @return {IResponse|INext} Brief description of the returning value here.
	 */
	softDelete=async(req: IRequest, res: IResponse, next: INext) => {
		return {softDeleted: true};
	};
		/**
	 * Brief desc
	 * @summary Summary
	 * @param {IRequest} req Default express req obj
	 * @param {IResponse} res - Default express res obj
	 * @param {INext} next - Next middleware
	 * @return {IResponse|INext} Brief description of the returning value here.
	 */
	findFolders=async(req: IRequest, res: IResponse, next: INext) => {
		return {folders: true};
	};
	/**
	 * Brief desc
	 * @summary Summary
	 * @param {IRequest} req Default express req obj
	 * @param {IResponse} res - Default express res obj
	 * @param {INext} next - Next middleware
	 * @return {IResponse|INext} Brief description of the returning value here.
	 */
	findById= async(req: IRequest, res: IResponse, next: INext) => {
		return {finding:true}
	}
	/**
	 * Brief desc
	 * @summary Summary
	 * @param {IRequest} req Default express req obj
	 * @param {IResponse} res - Default express res obj
	 * @param {INext} next - Next middleware
	 * @return {IResponse|INext} Brief description of the returning value here.
	 */
	findByName=async (req: IRequest, res: IResponse, next: INext) => {
		return {finsfing: 'findByName'};
	};
	/**
	 * Brief desc
	 * @summary Summary
	 * @param {IRequest} req Default express req obj
	 * @param {IResponse} res - Default express res obj
	 * @param {INext} next - Next middleware
	 * @return {IResponse|INext} Brief description of the returning value here.
	 */
	findWorkspaceFolders=async (
		req: IRequest,
		res: IResponse,
		next: INext
	) => {
		return {finding: 'workspace folders'};
	};
	/**
	 * Brief desc
	 * @summary Summary
	 * @param {IRequest} req Default express req obj
	 * @param {IResponse} res - Default express res obj
	 * @param {INext} next - Next middleware
	 * @return {IResponse|INext} Brief description of the returning value here.
	 */
	createFolder= async(req: IRequest, res: IResponse, next: INext) => {
		return {created:true};
	};
	/**
	 * Brief desc
	 * @summary Summary
	 * @param {IRequest} req Default express req obj
	 * @param {IResponse} res - Default express res obj
	 * @param {INext} next - Next middleware
	 * @return {IResponse|INext} Brief description of the returning value here.
	 */
	copyFolder= async(req: IRequest, res: IResponse, next: INext) => {
		return {copy:true};
	};
	/**
	 * Brief desc
	 * @summary Summary
	 * @param {IRequest} req Default express req obj
	 * @param {IResponse} res - Default express res obj
	 * @param {INext} next - Next middleware
	 * @return {IResponse|INext} Brief description of the returning value here.
	 */
	updateFolder=async(req: IRequest, res: IResponse, next: INext) => {
		return {updating:true};
	};
	/**
	 * Brief desc
	 * @summary Summary
	 * @param {IRequest} req Default express req obj
	 * @param {IResponse} res - Default express res obj
	 * @param {INext} next - Next middleware
	 * @return {IResponse|INext} Brief description of the returning value here.
	 */
	moveFolder =async (req: IRequest, res: IResponse, next: INext) => {
		return { move: 'moveFolder' };
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
