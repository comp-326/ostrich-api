import { IFolder, IFolderRepository, IFolderUseCases } from '../interfaces';

export class FolderUseCase implements IFolderUseCases{
	constructor(private repository: IFolderRepository){}
	addFolder: (folderData: IFolder) => Promise<any>;
	copyFolder: (folderData: IFolder) => Promise<any>;
	editFolder: (folderData: IFolder) => Promise<any>;
	listFolderById: (folderData: IFolder) => Promise<any>;
	listFolderByName: (folderData: IFolder) => Promise<any>;
	listFolders: (folderData: IFolder) => Promise<any>;
	listWorkspaceFolders: (folderData: IFolder) => Promise<any>;
	moveFolder: (folderData: IFolder) => Promise<any>;
	softRemoveFolder: (folderData: IFolder) => Promise<any>;
	hardRemoveFolder: (folderData: IFolder) => Promise<any>;
	
}
