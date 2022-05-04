/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IFolder, IFolderRepository } from '../interfaces';
import FolderModel from '@ostrich-app/models/Folder/FolderModel';
import WorkspaceModel from '@ostrich-app/models/Workspace/WorkspaceModel';

class FolderRepository implements IFolderRepository{
	findByName = async (name: string) => {
		const folder = await FolderModel.findOne({ name });
		return folder;
	};
	findById = async (id: string) => {
		const folder = await FolderModel.findById(id);
		return folder;
	};
	findWorkspaceById = async (id: string) => {
		const workspace = await WorkspaceModel.findById(id);
		return workspace;
	};
	find = async (limit: number, page: number) => {
		const folders = await FolderModel.find()
			.limit(limit)
			.skip(limit * (page - 1));
		return folders;
	};
	findWorkspaceFolders = async (
		workspaceId: string,
		limit: number,
		page: number,
	) => {
		const workspaceFolders = await FolderModel.find({
			workspace: workspaceId,
		})
			.limit(limit)
			.skip(limit * (page - 1));
		return workspaceFolders;
	};
	updateById = async (id: string, data: IFolder) => {
		const editedFolder = await FolderModel.findByIdAndUpdate(
			id,
			{ ...data },
			{ new: true },
		);
		return editedFolder;
	};
	deleteById = async (id: string) => {
		await FolderModel.findByIdAndDelete(id);
		return true;
	};
	comment: (id: string) => Promise<any>;
	like: (userId: string, id: string) => Promise<any>;
	move = async (destinationWorkspace: string, folderId: string) => {
		const movedFolder = await FolderModel.findByIdAndUpdate(folderId, {
			workspace: destinationWorkspace,
		});
		return movedFolder;
	};
	copy = async (destinationWorkspace: string, folderData: IFolder) => {
		const copiedFolder = await FolderModel.create({
			...folderData,
			workspace: destinationWorkspace,
		});
		return copiedFolder;
	};
	createFolder = async (workspaceId: string, data: IFolder) => {
		const newFolder = await FolderModel.create({
			...data,
			workspace: workspaceId,
		});
		return newFolder;
	};
}

export default new FolderRepository();
