import { ExpressError } from '@ostrich-app/common/errors/ExpressError';
import { IWorkspaceMemberRepository } from '../interfaces';
import validateMongodbId from '@ostrich-app/utils/mongo/ObjectId-validator';
import { workspaceMemberFactory } from '@ostrich-app/factories/workspaceMember';

export function makeJoinWorkspace({
	repository,
}: {
	repository: IWorkspaceMemberRepository,
}) {
	return async (inviteId: string) => {
		if (!inviteId) {
			throw new ExpressError({
				message: 'InviteId is required',
				statusCode: 400,
				status: 'warning',
				data: {},
			});
		}
		if (!validateMongodbId(inviteId)) {
			throw new ExpressError({
				message: 'Invalid InviteId',
				statusCode: 400,
				status: 'warning',
				data: {},
			});
		}
		const existingInvite = await repository.getWorkspaceMemberInvitation(
			inviteId,
		);
		if (!existingInvite) {
			throw new ExpressError({
				message: 'Invite not found',
				status: 'warning',
				statusCode: 404,
				data: {},
			});
		}
		const user = await repository.getWorkspaceMemberByEmail(
			existingInvite.inviteeEmail,
		);
		const workspace = await repository.getWorkspace(
			existingInvite.workspaceId,
		);
		const role = await repository.getWorkspaceRoleById(
			existingInvite.inviteRoleId,
		);
		const newMember = await workspaceMemberFactory()(
			role._id,
			user.email,
			workspace._id,
		);
		const joined = await repository.createNewWorkspaceMember(newMember);
		await repository.confirmInvite(inviteId);

		return joined;
	};
}
