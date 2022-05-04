import { INext, IResponse } from '@ostrich-app/common/types';
import IRequest from '@ostrich-app/common/interfaces/request';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IStandout {
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

export interface IStandoutRequest {
	params: any;
	body: any;
	query: any;
	headers: any;
	files?: any;
	file?: any;
}

export interface IStandoutRepository {
	createFolder: (workspaceId: string, data: IStandout) => Promise<any>;
	findByName: (name: string) => Promise<any>;
	findById: (id: string) => Promise<any>;
	findWorkspaceById: (id: string) => Promise<any>;
	find: (limit: number, page: number) => Promise<any>;
	findWorkspaceFolders: (
		workspaceId: string,
		limit: number,
		page: number
	) => Promise<any>;
	updateById: (id: string, data: IStandout) => Promise<any>;
	deleteById: (id: string) => Promise<any>;
	comment: (id: string) => Promise<any>;
	like: (userId: string, id: string) => Promise<any>;
	move: (destinationWorkspace: string, folderId: string) => Promise<any>;
	copy: (destinationWorkspace: string, folderData: IStandout) => Promise<any>;
}

export interface IStandoutValidator {
	isValidFolder: (email: string) => boolean;
}

export interface IStandoutUseCases {
	addFolder: (folderData: IStandout) => Promise<any>;
	copyFolder: (folderData: IStandout) => Promise<any>;
	editFolder: (folderData: IStandout) => Promise<any>;
	listFolderById: (folderData: IStandout) => Promise<any>;
	listFolderByName: (folderData: IStandout) => Promise<any>;
	listFolders: (folderData: IStandout) => Promise<any>;
	listWorkspaceFolders: (folderData: IStandout) => Promise<any>;
	moveFolder: (folderData: IStandout) => Promise<any>;
	softRemoveFolder: (folderData: IStandout) => Promise<any>;
	hardRemoveFolder: (folderData: IStandout) => Promise<any>;
}

export interface IStandoutController {
	softDelete: (req:IRequest,res:IResponse,next:INext) => Promise<any>;
	findById: (req:IRequest,res:IResponse,next:INext) => Promise<any>;
	findFolders: (req:IRequest,res:IResponse,next:INext) => Promise<any>;
	findByName: (req:IRequest,res:IResponse,next:INext) => Promise<any>;
	findWorkspaceFolders: (req:IRequest,res:IResponse,next:INext) => Promise<any>;
	createFolder: (req:IRequest,res:IResponse,next:INext) => Promise<any>;
	copyFolder: (req:IRequest,res:IResponse,next:INext) => Promise<any>;
	updateFolder:(req:IRequest,res:IResponse,next:INext) => Promise<any>;
	moveFolder: (req:IRequest,res:IResponse,next:INext) => Promise<any>;
	hardDeleteFolder: (req:IRequest,res:IResponse,next:INext) => Promise<any>;
}
