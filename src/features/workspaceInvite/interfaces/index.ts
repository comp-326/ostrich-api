/* eslint-disable @typescript-eslint/no-explicit-any */
import { IWorkspaceInvite } from '../models/interfaces';
import { INext, IRequest, IResponse } from '@ostrich-app-common/types';

export interface IWorkspaceInviteUseCase {
	inviteUserToWorkspace: (data:IWorkspaceInvite) =>Promise<any>
	revokeWorkspaceInvite: (inviteId:string) =>Promise<any>
	getPendingInvites: (workspaceId:string) =>Promise<any>
	getConfirmedInvites: (workspaceId:string) =>Promise<any>
	updateExistingInvite?: () =>Promise<any>
	joinWorkspaceViaInvite?: () =>Promise<any>
}

export interface IWorkspaceInviteRepository {
	createInvite: (inviteData: IWorkspaceInvite) => Promise<any>
	deleteInvite: (inviteId:string) => Promise<any>
	updateInvite?: () => Promise<any>
	getConfirmed: (workspaceId:string) => Promise<any>
	getPending: (workspaceId:string) => Promise<any>
	getInviteById: (id:string) => Promise<any>
	confirmInvite: (inviteId:string) => Promise<any>
	getInviteWorkspace: (workspaceId:string) => Promise<any>
	getUserInvite: (userEmail:string,workspaceId:string) => Promise<any>
}

export interface IWorkspaceInviteController {
	createInvite: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	deleteInvite: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	confirmInvite?: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	updateInvite?: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	getPendingInvites: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	getConfirmedInvites: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	rejectInvite: (req: IRequest, res: IResponse, next: INext) => Promise<any>
}