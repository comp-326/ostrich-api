import EventBus from '@ostrich-app/services/eventBus';
import { ExpressError } from '@ostrich-app/common/errors/ExpressError';
import { IWorkspaceInvite } from './../models/interfaces';
import createInvite from '../entities';
import validateMongodbId from '@ostrich-app/utils/mongo/ObjectId-validator';
import { IWorkspaceInviteRepository, IWorkspaceInviteUseCase } from './../interfaces';

export class WorkspaceInviteUseCases implements IWorkspaceInviteUseCase {

	constructor(private readonly repository: IWorkspaceInviteRepository) {
	}

	getPendingInvites=async (workspaceId: string) =>{
		const invites = await this.repository.getPending(workspaceId);
		if(invites.length === 0){
			throw new ExpressError(
				{
					message: 'No pending invites',	
					status: 'warning',
					data: {},
					statusCode: 404,

				});}

		return invites;

	};

	getConfirmedInvites=async(workspaceId: string) =>{
		const invites = await this.repository.getPending(workspaceId);
		if(invites.length === 0){
			throw new ExpressError(
				{
					message: 'No confirmed invites',	
					status: 'warning',
					data: {},
					statusCode: 404,

				});}

		return invites;
	};

	updateExistingInvite=async () =>{
		return {};
	};


	inviteUserToWorkspace = async (inviteData: IWorkspaceInvite) => {
		if(!inviteData.inviteRole){
			throw new ExpressError(
				{
					message: 'Invite role is required',
					status: 'error',
					data:{},
					statusCode: 400
				}
			);}
		if(!inviteData.workspaceId){
			throw new ExpressError({
				message: 'Workspace id is required',
				status: 'error',
				data:{},
				statusCode: 400
			});

		}
		if(!validateMongodbId(inviteData.workspaceId)){
			throw new ExpressError({
				message: 'Workspace id is not valid',
				status: 'error',
				data:{},
				statusCode: 400
			});
		}
		if (!validateMongodbId(inviteData.inviteRole)) {
			throw new ExpressError({
				message: 'Invite role is not valid',
				status: 'error',
				data:{},
				statusCode: 400
			});
		}
		if (!inviteData.inviteeEmail) {
			throw new ExpressError({
				message: 'Invitee email is required',
				status: 'error',
				data:{},
				statusCode: 400
			});
		}
		const existing = await this.repository.getUserInvite(inviteData.inviteeEmail, inviteData.workspaceId);
		if (existing) {
			throw new ExpressError({
				message: 'Invite already exists',
				status: 'error',
				data:{},
				statusCode: 400
			});
		}
		if (!inviteData.workspaceOwnerEmail) {
			throw new ExpressError({
				message: 'Workspace owner email is required',
				status:'warning',
				data:{},
				statusCode:400
			});
		}
		const newInvite=createInvite({...inviteData});
		const inviteWorkspace = await this.repository.getInviteWorkspace(newInvite.getWorkspaceId());

		// Send email to the new invitee
		const inviteeQueue = new EventBus('workspaceInviteeQueue');
		inviteeQueue.sendToQueue(JSON.stringify({
			inviteeEmail: newInvite.getInviteeEmail(),
			workspaceName: inviteWorkspace.name,
		}));
		// aSend email to the workspace owner
		const workspaceOwnerQueue = new EventBus('workspaceOwnerQueue');
		workspaceOwnerQueue.sendToQueue(JSON.stringify({
			workspaceOwnerEmail: newInvite.getWorkspaceOwnerEmail(),
			workspaceName: inviteWorkspace.name,
			inviteeEmail: newInvite.getInviteeEmail(),
			inviteRole: newInvite.getInviteRole(),
		}));
		// return {};

		return await this.repository.createInvite({
			inviteRole:newInvite.getInviteRole(),
			inviteeEmail:newInvite.getInviteeEmail(),
			inviteeId:newInvite.getInviteeId(),
			note:newInvite.getInviteNote(),
			status:newInvite.getInviteStatus(),
			workspaceId:newInvite.getWorkspaceId(),
			workspaceOwnerEmail:newInvite.getWorkspaceOwnerEmail()
			
		});
	};

	revokeWorkspaceInvite = async (inviteId:string) => {
		if(!inviteId){
			throw new ExpressError({
				message: 'Invite id is required',
				status: 'error',
				data:{},
				statusCode: 400
			});
		}
		if(!validateMongodbId(inviteId)){
			throw new ExpressError({
				message: 'Invite id is not valid',
				status: 'error',
				data:{},
				statusCode: 400
			});
		}
		const existing = await this.repository.getInviteById(inviteId);
		if (!existing) {
			throw new ExpressError({
				message: 'Invite does not exist',
				status: 'error',
				data:{},
				statusCode: 404
			});

		}

		return await this.repository.deleteInvite(inviteId);

	};

}
