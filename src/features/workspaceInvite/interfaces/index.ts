/* eslint-disable @typescript-eslint/no-explicit-any */
import { IWorkspaceInviteDocument } from '../models/interfaces';
import { INext, IRequest, IResponse } from '@ostrich-app/common/types';

export interface IWorkspaceInviteUseCase {
	addRoles: () => Promise<IWorkspaceInviteDocument[] | IWorkspaceInviteDocument|null>
	listRoles: () => Promise<IWorkspaceInviteDocument[] | IWorkspaceInviteDocument|null>
}

export interface IWorkspaceInviteRepository {
	findByName: (name: string) => Promise<IWorkspaceInviteDocument|null>
	createRoles: () => Promise<IWorkspaceInviteDocument | IWorkspaceInviteDocument[]>
	findRoles: () => Promise<IWorkspaceInviteDocument | IWorkspaceInviteDocument[]|null>
}

export interface IWorkspaceInviteController {
	createRoles: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	getRoles: (req: IRequest, res: IResponse, next: INext) => Promise<any>
}