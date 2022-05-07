import { IFolder, IFolderRepository, IFolderUseCases } from '../interfaces';

export class FolderUseCase implements IFolderUseCases{
	constructor(private readonly repository: IFolderRepository){}

	addFolder=async (folderData: IFolder) => {

		await this.repository.createFolder('',folderData);

		return {};
	};

	copyFolder=async (folderData: IFolder) => {
		await this.repository.createFolder('',folderData);

		return {};
	};

	editFolder=async (folderData: IFolder) => {
		await this.repository.createFolder('',folderData);

		return {};
	};

	listFolderById=async (folderData: IFolder) => {
		await this.repository.createFolder('',folderData);

		return {};
	};

	listFolderByName=async (folderData: IFolder) => {
		await this.repository.createFolder('',folderData);

		return {};
	};

	listFolders=async (folderData: IFolder) => {
		await this.repository.createFolder('',folderData);

		return {};
	};

	listWorkspaceFolders=async (folderData: IFolder) => {
		await this.repository.createFolder('',folderData);

		return {};
	};

	moveFolder=async (folderData: IFolder) => {
		await this.repository.createFolder('',folderData);

		return {};
	};

	softRemoveFolder=async (folderData: IFolder) => {
		await this.repository.createFolder('',folderData);

		return {};
	};

	hardRemoveFolder=async (folderData: IFolder) => {
		await this.repository.createFolder('',folderData);

		return {};
	};
	
}
