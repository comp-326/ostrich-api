import { INext, IRequest, IResponse } from '@ostrich-app/common/types';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IFolder {
	name: string;
	isStandout: boolean;
	type: string;
	size: string;
	views: number;
	likes: number;
	address: {
		location: string;
		country: string;
		loactionType: string;
	};
	images: { public_id: string; url: string }[];

	finance: {
		tuitionFeeUnderGraduate: number;
		tuitionFeePostGraduate: number;
		tuitionFeePostDeposit: number;
		tuitionPricingCategory: string;
		currency: string;
		scholarshipAverage: string;
		scholarshipChances: string;
		internationalFeeDiferential: number;
	};
	prompts: string[];
	comments: string[];
}

export interface IFolderRequest {
	params: any;
	body: any;
	query: any;
	headers: any;
	files?: any;
	file?: any;
}

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

export interface IFolderValidator {
	isValidFolder: (email: string) => boolean;
}

export interface IFolderUseCases {
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
