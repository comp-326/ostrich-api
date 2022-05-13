import EventBus from '@ostrich-app/services/eventBus';
import { ExpressError } from '@ostrich-app/common/errors/ExpressError';
import { IWorkspaceMember } from '../models/interfaces';
import createNewWorkspaceMember from '../entities';
import validateMongodbId from '@ostrich-app/utils/mongo/ObjectId-validator';
import { IWorkspaceMemberRepository, IWorkspaceMemberUseCase } from './../interfaces';

export class WorkspaceUseCases implements IWorkspaceMemberUseCase {

	constructor(private readonly repository: IWorkspaceMemberRepository) {
	}

	listMemberByRole=async (workspaceId: string, roleId: string) => {
		return await this.repository.findMembersByRole(workspaceId, roleId);
	};

	addMember = async (memberDetails: IWorkspaceMember) => {

		const {
			getMemberEmail,
			getMemberId,
			getMemberPhone,
			getMemberRoleId,
			getWorkspaceId,
			getWorkspaceOwnerEmail,
			getWorkspaceOwnerId,
			getWorkspaceOwnerPhone
		} = createNewWorkspaceMember(memberDetails);
		if (!validateMongodbId(getWorkspaceId())) {
			throw new ExpressError({
				message: 'Please provide a valid workspace id',
				data: {},
				status: 'warning',
				statusCode: 400
			});
		}
		if (!validateMongodbId(getMemberId())) {
			throw new ExpressError({
				message: 'Invalid member id',
				data: {},
				status: 'warning',
				statusCode: 400
			});
		}
		if (!validateMongodbId(getMemberRoleId())) {
			throw new ExpressError({
				message: 'Invalid member role id',
				data: {},
				status: 'warning',
				statusCode: 400
			});
		}
		if (!validateMongodbId(getWorkspaceOwnerId())) {
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
		const existingOwner = await this.repository.getWorkspaceOwner(getWorkspaceOwnerId());
		if (!existingOwner) {
			throw new ExpressError({
				message: 'Workspace owner does not exist',
				data: {},
				status: 'warning',
				statusCode: 400
			});
		}

		const newMember = await this.repository.createNewWorkspaceMember({
			workspaceId: getWorkspaceId(),
			memberId: getMemberId(),
			memberRoleId: getMemberRoleId(),
			memberEmail: getMemberEmail(),
			memberPhone: getMemberPhone(),
			workspaceOwnerId: getWorkspaceOwnerId(),
			workspaceOwnerEmail: getWorkspaceOwnerEmail(),
			workspaceOwnerPhone: getWorkspaceOwnerPhone()
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
