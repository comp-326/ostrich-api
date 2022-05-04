/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IStandout, IStandoutRepository } from '../interfaces';
import StandoutModel from '@ostrich-app/features/standouts/models';

class StandoutRepository implements IStandoutRepository{
	createFolder: (workspaceId: string, data: IStandout) =>
		/* eslint-disable @typescript-eslint/no-non-null-assertion */
		Promise<any>;
	findWorkspaceFolders: (workspaceId: string, limit: number, page: number) => Promise<any>;
	findByName = async (name: string) => {
		const folder = await StandoutModel.findOne({ name });
		return folder;
	};
	findById = async (id: string) => {
		const folder = await StandoutModel.findById(id);
		return folder;
	};
	findWorkspaceById = async (id: string) => {
		const workspace = await StandoutModel.findById(id);
		return workspace;
	};
	find = async (limit: number, page: number) => {
		const folders = await StandoutModel.find()
			.limit(limit)
			.skip(limit * (page - 1));
		return folders;
	};
	findWorkspaceStandouts = async (
		workspaceId: string,
		limit: number,
		page: number,
	) => {
		const workspaceStandouts = await StandoutModel.find({
			workspace: workspaceId,
		})
			.limit(limit)
			.skip(limit * (page - 1));
		return workspaceStandouts;
	};
	updateById = async (id: string, data: IStandout) => {
		const editedStandout = await StandoutModel.findByIdAndUpdate(
			id,
			{ ...data },
			{ new: true },
		);
		return editedStandout;
	};
	deleteById = async (id: string) => {
		await StandoutModel.findByIdAndDelete(id);
		return true;
	};
	comment: (id: string) => Promise<any>;
	like: (userId: string, id: string) => Promise<any>;
	move = async (destinationWorkspace: string, folderId: string) => {
		const movedStandout = await StandoutModel.findByIdAndUpdate(folderId, {
			workspace: destinationWorkspace,
		});
		return movedStandout;
	};
	copy = async (destinationWorkspace: string, folderData: IStandout) => {
		const copiedStandout = await StandoutModel.create({
			...folderData,
			workspace: destinationWorkspace,
		});
		return copiedStandout;
	};
	createStandout = async (workspaceId: string, data: IStandout) => {
		const newStandout = await StandoutModel.create({
			...data,
			workspace: workspaceId,
		});
		return newStandout;
	};
}

export default new StandoutRepository();
