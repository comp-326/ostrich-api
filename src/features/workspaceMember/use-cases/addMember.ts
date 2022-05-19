import EventBus from '@ostrich-app/services/eventBus';
import { ExpressError } from '@ostrich-app/common/errors/ExpressError';
import { IWorkspaceMember } from '../models/interfaces';
import { IWorkspaceMemberRepository } from '../interfaces';
import createNewWorkspaceMember from '../entities';
import validateMongodbId from '@ostrich-app/utils/mongo/ObjectId-validator';

export function makeAddWokspacemember({
	repository,
}: {
	repository: IWorkspaceMemberRepository,
}) {
	return async (memberDetails: IWorkspaceMember) => {
		const { getMemberEmail, getMember, getMemberRole, getWorkspaceId } =
			createNewWorkspaceMember(memberDetails);
		if (!validateMongodbId(getWorkspaceId())) {
			throw new ExpressError({
				message: 'Please provide a valid workspace id',
				data: {},
				status: 'warning',
				statusCode: 400,
			});
		}
		if (!validateMongodbId(getMember())) {
			throw new ExpressError({
				message: 'Invalid member id',
				data: {},
				status: 'warning',
				statusCode: 400,
			});
		}
		if (!validateMongodbId(getMemberRole())) {
			throw new ExpressError({
				message: 'Invalid member role id',
				data: {},
				status: 'warning',
				statusCode: 400,
			});
		}
		if (!validateMongodbId(getWorkspaceId())) {
			throw new ExpressError({
				message: 'Invalid workspace owner id',
				data: {},

				status: 'warning',
				statusCode: 400,
			});
		}

		const existingWorkspace = await repository.getWorkspace(
			getWorkspaceId(),
		);
		if (!existingWorkspace) {
			throw new ExpressError({
				message: 'Workspace does not exist',
				data: {},
				status: 'warning',
				statusCode: 400,
			});
		}

		const newMember = await repository.createNewWorkspaceMember({
			workspaceId: getWorkspaceId(),
			member: getMember(),
			memberRole: getMemberRole(),
			memberEmail: getMemberEmail(),
		});
		// Send email to the member
		const newMemberQueue = new EventBus('newWorkspaceMemberQueue');
		newMemberQueue.sendToQueue(JSON.stringify(newMember));
		// Send email to the workspace owner
		const workspaceOwnerQueue = new EventBus(
			'workspaceOwnerNewMemberQueue',
		);
		workspaceOwnerQueue.sendToQueue(JSON.stringify(newMember));

		return newMember;
	};
}
