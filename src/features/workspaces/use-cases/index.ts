import { IWorkspace, IWorkspaceRepository, IWorkspaceUseCases } from '../interfaces';

export class WorkspaceUseCase implements IWorkspaceUseCases{
	constructor(private repository: IWorkspaceRepository){}
	addWorkspace: (folderData: IWorkspace) => Promise<any>;
	copyWorkspace: (folderData: IWorkspace) => Promise<any>;
	editWorkspace: (folderData: IWorkspace) => Promise<any>;
	listWorkspaceById: (folderData: IWorkspace) => Promise<any>;
	listWorkspaceByName: (folderData: IWorkspace) => Promise<any>;
	listWorkspaces: (folderData: IWorkspace) => Promise<any>;
	listWorkspaceWorkspaces: (folderData: IWorkspace) => Promise<any>;
	moveWorkspace: (folderData: IWorkspace) => Promise<any>;
	softRemoveWorkspace: (folderData: IWorkspace) => Promise<any>;
	hardRemoveWorkspace: (folderData: IWorkspace) => Promise<any>;
	addFolder: (folderData: IWorkspace) => Promise<any>;
	copyFolder: (folderData: IWorkspace) => Promise<any>;
	editFolder: (folderData: IWorkspace) => Promise<any>;
	listFolderById: (folderData: IWorkspace) => Promise<any>;
	listFolderByName: (folderData: IWorkspace) => Promise<any>;
	listFolders: (folderData: IWorkspace) => Promise<any>;
	listWorkspaceFolders: (folderData: IWorkspace) => Promise<any>;
	moveFolder: (folderData: IWorkspace) => Promise<any>;
	softRemoveFolder: (folderData: IWorkspace) => Promise<any>;
	hardRemoveFolder: (folderData: IWorkspace) => Promise<any>;
	
}
