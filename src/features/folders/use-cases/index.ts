import { IFolder } from '../models/interfaces';
import { IFolderRepository, IFolderUseCases } from '../interfaces';

export class FolderUseCase implements IFolderUseCases {
	constructor(private readonly repository: IFolderRepository) { }

	addFolder = async (workspaceId: string, folderData: IFolder) => {
		await this.repository.createFolder(workspaceId,folderData);

		return;
	};

	copyFolder = async (destinationId: string, folderId: string) => {
		return;
	};

	editFolder = async (folderId: string, folderData: IFolder) => {
		return;
	};

	listFolderById = async (folderId: string) => {
		return;
	};

	listFolderByName = async (name: string) => {
		return;
	};

	listFolders = async (limit: number, page: number) => {
		return;
	};

	listWorkspaceFolders = async (workspaceId: string, limit: number, page: number) => {
		return;
	};

	moveFolder = async (destinationId: string, workspaceId: string) => {
		return;
	};

	softRemoveFolder = async (folderId: string) => {
		return;
	};

	hardRemoveFolder = async (folderId: string) => {
		return;
	};


}
