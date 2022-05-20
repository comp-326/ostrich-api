/* eslint-disable @typescript-eslint/no-explicit-any */
import { IWorkspaceRoleDocument } from '../models/interfaces';
import { INext, IRequest, IResponse } from '@ostrich-app-common/types';

export interface IWorkspaceRoleUseCase {
	addRoles: () => Promise<IWorkspaceRoleDocument[] | IWorkspaceRoleDocument|null>
	listRoles: () => Promise<IWorkspaceRoleDocument[] | IWorkspaceRoleDocument|null>
}

export interface IWorkspaceRoleRepository {
	findByName: (name: string) => Promise<IWorkspaceRoleDocument|null>
	createRoles: () => Promise<IWorkspaceRoleDocument | IWorkspaceRoleDocument[]>
	findRoles: () => Promise<IWorkspaceRoleDocument | IWorkspaceRoleDocument[]|null>
}

export interface IWorkspaceRoleController {
	createRoles: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	getRoles: (req: IRequest, res: IResponse, next: INext) => Promise<any>
}