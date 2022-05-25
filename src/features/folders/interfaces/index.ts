/* eslint-disable @typescript-eslint/no-explicit-any */
import { IFolder } from '../models/interfaces';
import { INext, IRequest, IResponse } from '@ostrich-app-common/types';

export interface IFolderRepository {
	createFolder: (workspaceId: string, data: IFolder) => Promise<any>;
	findByName: (name: string) => Promise<any>;
	findById: (id: string) => Promise<any>;
	findWorkspaceById: (id: string) => Promise<any>;
	find: (limit: number, page: number) => Promise<any>;
	findWorkspaceFolders: (
		workspaceId: string,
		limit: number,
		page: number
	) => Promise<any>;
	updateById: (id: string, data: IFolder) => Promise<any>;
	deleteById: (id: string) => Promise<any>;
	comment: (id: string) => Promise<any>;
	like: (userId: string, id: string) => Promise<any>;
	move: (destinationWorkspace: string, folderId: string) => Promise<any>;
	copy: (destinationWorkspace: string, folderData: IFolder) => Promise<any>;
}

export interface IFolderUseCases {
	addFolder: (workspaceId: string, folderData: IFolder) => Promise<any>;
	copyFolder: (destinationId: string, folderId: string) => Promise<any>;
	editFolder: (folderId: string, folderData: IFolder) => Promise<any>;
	listFolderById: (folderId: string) => Promise<any>;
	listFolderByName: (name: string) => Promise<any>;
	listFolders: (limit: number, page: number) => Promise<any>;
	listWorkspaceFolders: (workspaceId: string, limit: number, page: number) => Promise<any>;
	moveFolder: (destinationId: string, workspaceId: string) => Promise<any>;
	softRemoveFolder: (folderId: string) => Promise<any>;
	hardRemoveFolder: (folderId: string) => Promise<any>;
}

export interface IFolderController {
	softDelete: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	findById: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	findFolders: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	findByName: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	findWorkspaceFolders: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	createFolder: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	copyFolder: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	updateFolder: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	moveFolder: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	hardDeleteFolder: (req: IRequest, res: IResponse, next: INext) => Promise<any>
}
