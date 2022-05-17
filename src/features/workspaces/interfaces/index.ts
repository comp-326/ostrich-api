import { IWorkspace } from '@ostrich-app-features/workspaces/models/interfaces';
import { INext, IRequest, IResponse } from '@ostrich-app-common/types';

/* eslint-disable @typescript-eslint/no-explicit-any */


export interface IWorkspaceRepository {
	createWorkspace: (data: IWorkspace) => Promise<any>;
	findByName: (name: string) => Promise<any>;
	findById: (id: string) => Promise<any>;
	findWorkspaceById: (id: string) => Promise<any>;
	findAll: (limit: number, page: number) => Promise<any>;
	findUserWorkspaces: (
		userId: string,
		limit: number,
		page: number
	) => Promise<any>;
	updateById: (id: string, data: IWorkspace) => Promise<any>;
	deleteById: (id: string) => Promise<any>;
	comment: (id: string) => Promise<any>;
	getWorkspace: (workspaceId:string) => Promise<any>;
	getWorkspaceAdminRole: () => Promise<any>;
}

export interface IWorkspaceValidator {
	isValidWorkspace: (email: string) => boolean;
}

export interface IWorkspaceUseCases {
	addWorkspace: (workspaceData: IWorkspace) => Promise<any>;
	editWorkspace: (worspaceId:string,workspaceData: IWorkspace) => Promise<any>;
	listWorkspaceById: (id: string) => Promise<any>;
	listWorkspaceByName: (name: string) => Promise<any>;
	listWorkspaces: (limit:number,offset:number) => Promise<any>;
	listUserWorkspaces: (userId:string,props:{limit:number,offset:number}) => Promise<any>;
	softRemoveWorkspace: (id: string) => Promise<any>;
	hardRemoveWorkspace: (id: IWorkspace) => Promise<any>;
}

export interface IWorkspaceController {
	softDelete: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	findById: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	findWorkspaces: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	findByName: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	findUserWorkspaces: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	createWorkspace: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	updateWorkspace: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	hardDeleteWorkspace: (req: IRequest, res: IResponse, next: INext) => Promise<any>
}
