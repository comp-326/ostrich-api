import { INext, IRequest, IResponse } from '@ostrich-app/common/types';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IWorkspace {
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

export interface IWorkspaceRequest {
	params: any;
	body: any;
	query: any;
	headers: any;
	files?: any;
	file?: any;
}

export interface IWorkspaceRepository {
	createWorkspace: (workspaceId: string, data: IWorkspace) => Promise<any>;
	findByName: (name: string) => Promise<any>;
	findById: (id: string) => Promise<any>;
	findWorkspaceById: (id: string) => Promise<any>;
	find: (limit: number, page: number) => Promise<any>;
	findWorkspaceWorkspaces: (
		workspaceId: string,
		limit: number,
		page: number
	) => Promise<any>;
	updateById: (id: string, data: IWorkspace) => Promise<any>;
	deleteById: (id: string) => Promise<any>;
	comment: (id: string) => Promise<any>;
	like: (userId: string, id: string) => Promise<any>;
	move: (destinationWorkspace: string, folderId: string) => Promise<any>;
	copy: (destinationWorkspace: string, folderData: IWorkspace) => Promise<any>;
}

export interface IWorkspaceValidator {
	isValidWorkspace: (email: string) => boolean;
}

export interface IWorkspaceUseCases {
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
}

export interface IWorkspaceController {
	softDelete: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	findById: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	findWorkspaces: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	findByName: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	findWorkspaceWorkspaces: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	createWorkspace: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	copyWorkspace: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	updateWorkspace: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	moveWorkspace: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	hardDeleteWorkspace: (req: IRequest, res: IResponse, next: INext) => Promise<any>
}
