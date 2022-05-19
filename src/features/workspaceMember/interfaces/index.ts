/* eslint-disable @typescript-eslint/no-explicit-any */
import { IWorkspaceMember } from './../models/interfaces';
import { INext, IRequest, IResponse } from '@ostrich-app-common/types';

export interface IWorkspaceMemberUseCase {
	addMember: (memberDetails:IWorkspaceMember) => Promise<any>
	removeMember: (memberId:string) => Promise<any>
	changeMemberRole: (workspaceId:string,memberId:string,memberRoleId:string) => Promise<any>
	listMembers: (workspaceId:string,limit:number,page:number) => Promise<any>
	listIndividualMember: (memberId:string) => Promise<any>
	listMemberByRole: (workspaceId:string,roleId:string) => Promise<any>
	joinWorkspace: (inviteId:string) => Promise<any>
}

export interface IWorkspaceMemberRepository {
	findAll: (workspaceId: string,props:{limit:number,page:number}) => Promise<any>
	findMembersByRole: (workspaceId:string,roleId:string) => Promise<any>
	createNewWorkspaceMember: (workspaceMemberData:IWorkspaceMember) => Promise<any>
	updateMemberRole: (workspaceId:string,memberId:string,roleId:string) => Promise<any>
	getWorkspace: (workspaceId:string) => Promise<any>
	deleteMember: (workspaceMemberId:string) => Promise<any>
	getWorkspaceOwner: (workspaceOwnerId:string) => Promise<any>
	getWorkspaceMember: (workspaceMemberId:string) => Promise<any>
	getWorkspaceMemberInvitation: (inviteId:string) => Promise<any>
	getWorkspaceRoleById: (roleId:string) => Promise<any>
	getWorkspaceMemberByEmail: (email:string) => Promise<any>
<<<<<<< HEAD
=======
	getInviteById: (inviteId:string) => Promise<any>
	confirmInvite: (inviteId:string) => Promise<any>
>>>>>>> 19227add749a048126a79c4f5addd72379b1e746
}

export interface IWorkspaceMemberController {
	createMember: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	changeMemberRole: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	getMembers: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	getMember: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	getMembersByRole: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	removeMember: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	joinWorkspace: (req: IRequest, res: IResponse, next: INext) => Promise<any>
}