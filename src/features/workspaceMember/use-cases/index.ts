import EventBus from '@ostrich-app/services/eventBus';
import { ExpressError } from '@ostrich-app/common/errors/ExpressError';
import { IWorkspaceMember } from '../models/interfaces';
import createNewWorkspaceMember from '../entities';
import validateMongodbId from '@ostrich-app/utils/mongo/ObjectId-validator';
import { IWorkspaceMemberRepository, IWorkspaceMemberUseCase } from './../interfaces';

export class WorkspaceUseCases implements IWorkspaceMemberUseCase {

	constructor(private readonly repository: IWorkspaceMemberRepository) {
	}


	joinWorkspace = async (inviteId: string) => {
		const existingInvite = await this.repository.getWorkspaceMemberInvitation(inviteId);
		if (!existingInvite) {
			throw new ExpressError({
				message: 'Invite not found',
				status: 'warning',
				statusCode: 404,
				data: {}

			});
		}
		const user = await this.repository.getWorkspaceMemberByEmail(existingInvite.inviteeEmail);
		const workspace = await this.repository.getWorkspace(existingInvite.workspaceId);
		const role = await this.repository.getWorkspaceRoleById(existingInvite.inviteRoleId);
		const {
			getMember,getMemberEmail,getMemberRole,getWorkspaceId
		} = createNewWorkspaceMember({
			member: user._id,
			memberEmail: user.email,
			memberRole: role._id,
			workspaceId: workspace._id
		});
		const joined = await this.repository.createNewWorkspaceMember({
			member:getMember(),
			memberEmail:getMemberEmail(),memberRole:getMemberRole(),
			workspaceId:getWorkspaceId()
		});

		return joined;
	};

	listMemberByRole = async (workspaceId: string, roleId: string) => {
		return await this.repository.findMembersByRole(workspaceId, roleId);
	};

	addMember = async (memberDetails: IWorkspaceMember) => {

		const {
			getMemberEmail,
			getMember,
			getMemberRole,
			getWorkspaceId,
		} = createNewWorkspaceMember(memberDetails);
		if (!validateMongodbId(getWorkspaceId())) {
			throw new ExpressError({
				message: 'Please provide a valid workspace id',
				data: {},
				status: 'warning',
				statusCode: 400
			});
		}
		if (!validateMongodbId(getMember())) {
			throw new ExpressError({
				message: 'Invalid member id',
				data: {},
				status: 'warning',
				statusCode: 400
			});
		}
		if (!validateMongodbId(getMemberRole())) {
			throw new ExpressError({
				message: 'Invalid member role id',
				data: {},
				status: 'warning',
				statusCode: 400
			});
		}
		if (!validateMongodbId(getWorkspaceId())) {
			throw new ExpressError({
				message: 'Invalid workspace owner id',
				data: {},

				status: 'warning',
				statusCode: 400
			});
		}

		const existingWorkspace = await this.repository.getWorkspace(getWorkspaceId());
		if (!existingWorkspace) {
			throw new ExpressError({
				message: 'Workspace does not exist',
				data: {},
				status: 'warning',
				statusCode: 400
			});
		}


		const newMember = await this.repository.createNewWorkspaceMember({
			workspaceId: getWorkspaceId(),
			member: getMember(),
			memberRole: getMemberRole(),
			memberEmail: getMemberEmail(),
		});
		// Send email to the member
		const newMemberQueue = new EventBus('newWorkspaceMemberQueue');
		newMemberQueue.sendToQueue(JSON.stringify(newMember));
		// Send email to the workspace owner
		const workspaceOwnerQueue = new EventBus('workspaceOwnerNewMemberQueue');
		workspaceOwnerQueue.sendToQueue(JSON.stringify(newMember));

		return newMember;

	};

	removeMember = async (workspaceMemberId: string) => {
		return await this.repository.deleteMember(workspaceMemberId);
	};

	changeMemberRole = async (workspaceId: string, memberId: string, memberRoleId: string) => {
		return await this.repository.updateMemberRole(workspaceId, memberId, memberRoleId);
	};

	listMembers = async (workspaceId: string, limit: number, page: number) => {
		const members = await this.repository.findAll(workspaceId, { limit, page });
		if (members.length === 0) {
			throw new ExpressError({
				message: 'No members found',
				data: {},
				status: 'warning',
				statusCode: 404
			});
		}
	};

	listIndividualMember = async (memberId: string) => {
		return await this.repository.getWorkspaceMember(memberId);
	};

}
