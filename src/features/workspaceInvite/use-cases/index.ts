import EventBus from '@ostrich-app/services/eventBus';
import { ExpressError } from '@ostrich-app/common/errors/ExpressError';
import { IWorkspaceInvite } from './../models/interfaces';
import createInvite from '../entities';
import createWorkspaceInvite from './../entities';
import validateMongodbId from '@ostrich-app/utils/mongo/ObjectId-validator';
import { IWorkspaceInviteRepository, IWorkspaceInviteUseCase } from './../interfaces';

export class WorkspaceInviteUseCases implements IWorkspaceInviteUseCase {

	constructor(private readonly repository: IWorkspaceInviteRepository) {
	}

	getPendingInvites = async (workspaceId: string) => {
		const invites = await this.repository.getPending(workspaceId);
		if (invites.length === 0) {
			throw new ExpressError(
				{
					message: 'No pending invites',
					status: 'warning',
					data: {},
					statusCode: 404,

				});
		}

		return invites;

	};

	getConfirmedInvites = async (workspaceId: string) => {
		const invites = await this.repository.getPending(workspaceId);
		if (invites.length === 0) {
			throw new ExpressError(
				{
					message: 'No confirmed invites',
					status: 'warning',
					data: {},
					statusCode: 404,

				});
		}

		return invites;
	};

	updateExistingInviteById = async (inviteId: string, inviteData: Partial<IWorkspaceInvite>) => {
		if (!inviteId) {
			throw new ExpressError(
				{
					message: 'Invite id is required',
					status: 'warning',
					data: {},
					statusCode: 400,
				});
		}
		if (!validateMongodbId(inviteId)) {
			throw new ExpressError(
				{
					message: 'Invalid invite id',
					status: 'warning',
					data: {},
					statusCode: 400,
				});
		}
		const existingInvite = await this.repository.getInviteById(inviteId);
		if (!existingInvite) {
			throw new ExpressError(
				{
					message: 'Invite not found',
					status: 'warning',
					data: {},
					statusCode: 404,
				});
		}
		const { getInviteNote, getInviteRole, getInviteStatus, getInviteeEmail, getInviteeId, getWorkspaceId, getWorkspaceOwnerId } = createWorkspaceInvite({ ...existingInvite._doc, ...inviteData });

		await this.repository.updateInviteById(inviteId, {
			inviteeEmail: getInviteeEmail(),
			inviteeId: getInviteeId(),
			inviteRoleId: getInviteRole(),
			note: getInviteNote(),
			status: getInviteStatus(),
			workspaceId: getWorkspaceId(),
			workspaceOwnerId: getWorkspaceOwnerId(),
		});
	};


	inviteUserToWorkspace = async (inviteData: IWorkspaceInvite) => {
		if (!inviteData.inviteRoleId) {
			throw new ExpressError(
				{
					message: 'Invite role is required',
					status: 'error',
					data: {},
					statusCode: 400
				}
			);
		}
		if (!inviteData.workspaceId) {
			throw new ExpressError({
				message: 'Workspace id is required',
				status: 'error',
				data: {},
				statusCode: 400
			});

		}
		if (!validateMongodbId(inviteData.workspaceId)) {
			throw new ExpressError({
				message: 'Workspace id is not valid',
				status: 'error',
				data: {},
				statusCode: 400
			});
		}
		if (!validateMongodbId(inviteData.inviteRoleId)) {
			throw new ExpressError({
				message: 'Invite role is not valid',
				status: 'error',
				data: {},
				statusCode: 400
			});
		}
		if (!inviteData.inviteeEmail) {
			throw new ExpressError({
				message: 'Invitee email is required',
				status: 'error',
				data: {},
				statusCode: 400
			});
		}
		const existing = await this.repository.getUserInvite(inviteData.inviteeEmail, inviteData.workspaceId);
		if (existing) {
			throw new ExpressError({
				message: 'Invite already exists',
				status: 'error',
				data: {},
				statusCode: 400
			});
		}
		const workspace = await this.repository.getWorkspaceAndOwner(inviteData.workspaceId);
		if(!workspace){
			throw new ExpressError({
				message: 'Workspace not found',
				status: 'error',
				data: {},
				statusCode: 404
			});
		}
		inviteData.workspaceOwnerId=workspace.owner._id;
		console.log(inviteData);
		
		const workspaceInviteRole = await this.repository.getWorkspaceRole(inviteData.inviteRoleId);
		if (!workspaceInviteRole) {
			throw new ExpressError({
				message: 'Invalid role',
				status: 'warning',
				data: {},
				statusCode: 400
			});
		}
		const {
			getInviteNote,
			getInviteRole,
			getInviteStatus,
			getInviteeEmail,
			getInviteeId,
			getWorkspaceId,
			getWorkspaceOwnerId
		} = createInvite({
			...inviteData,
			inviteRoleId: workspaceInviteRole._id
		});
		const inviteWorkspace = await this.repository.getInviteWorkspace(getWorkspaceId());


		const invite= await this.repository.createInvite({
			inviteRoleId: getInviteRole(),
			inviteeEmail: getInviteeEmail(),
			inviteeId: getInviteeId(),
			note: getInviteNote(),
			status: getInviteStatus(),
			workspaceId: getWorkspaceId(),
			workspaceOwnerId: getWorkspaceOwnerId()

		});

		// Send email to the new invitee
		const inviteeQueue = new EventBus('inviteUserToWorkspace');
		inviteeQueue.sendToQueue(JSON.stringify({
			inviteeEmail: getInviteeEmail(),
			note: getInviteNote(),
			workspaceName: inviteWorkspace.name,
			workspaceLogo: inviteWorkspace.logo,
			inviteId:invite._id,
		}));
		// aSend email to the workspace owner
		const workspaceOwnerQueue = new EventBus('ownerInviteUserToWorkspace');
		workspaceOwnerQueue.sendToQueue(JSON.stringify({
			workspaceOwnerEmail:workspace.owner.email,
			workspaceName: inviteWorkspace.name,
			inviteeEmail: getInviteeEmail(),
			inviteRole: getInviteRole(),
		}));

		// return {}
		return invite;
	};

	revokeWorkspaceInvite = async (inviteId: string) => {
		if (!inviteId) {
			throw new ExpressError({
				message: 'Invite id is required',
				status: 'error',
				data: {},
				statusCode: 400
			});
		}
		if (!validateMongodbId(inviteId)) {
			throw new ExpressError({
				message: 'Invite id is not valid',
				status: 'error',
				data: {},
				statusCode: 400
			});
		}
		const existing = await this.repository.getInviteById(inviteId);
		if (!existing) {
			throw new ExpressError({
				message: 'Invite does not exist',
				status: 'error',
				data: {},
				statusCode: 404
			});

		}

		return await this.repository.deleteInvite(inviteId);

	};

}
