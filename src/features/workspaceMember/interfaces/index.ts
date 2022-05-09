/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUser } from '@ostrich-app/features/users/models/interfaces';
import { IWorkspaceMember } from './../models/interfaces';
import { INext, IRequest, IResponse } from '@ostrich-app-common/types';

export interface IWorkspaceMemberUseCase {
	addMember: (memberId:string,memberDetails:IWorkspaceMember) => Promise<any>
	removeMember: (memberId:string) => Promise<any>
	changeMemberRole: (memberId:string,memberRoleId:string) => Promise<any>
	joinWorkspace: (memberId:string,memberRoleId:string,workspaceId:string) => Promise<any>
	leaveWorkspace: (memberId:string,workspaceId:string) => Promise<any>
	listMembers: (limit:number,page:number) => Promise<any>
	listIndividualMember: (memberId:string) => Promise<any>
}

export interface IWorkspaceMemberRepository {
	findAll: (workspaceId: string) => Promise<any>
	findMembersByRole: (workspaceId:string,roleId:string) => Promise<any>
	createNewMember: (workspaceId:string,roleId:string,memberData:IUser) => Promise<any>
	updateMemberRole: (workspaceId:string,memberId:string) => Promise<any>
	deleteMember: (workspaceId:string,memberId:string) => Promise<any>
}

export interface IWorkspaceMemberController {
	createMember: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	changeMemberRole: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	joinWorkspace: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	getMembers: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	getMembersByRole: (req: IRequest, res: IResponse, next: INext) => Promise<any>
}