import { ExpressError } from '@ostrich-app/common/errors/ExpressError';
import { IWorkspaceInvite } from '../models/interfaces';

export default function makeCreateNewWorkspaceInvite() {
	return function ({
		inviteRoleId,
		inviteeEmail,
		inviteeId,
		note,
		status,
		workspaceId,
		workspaceOwnerId,
	}: IWorkspaceInvite) {
		if (!inviteRoleId) {
			throw new ExpressError({
				message: 'Invite role is required',
				status: 'error',
				data: {},
				statusCode: 400,
			});
		}
		if (!workspaceId) {
			throw new ExpressError({
				message: 'Workspace id is required',
				status: 'error',
				data: {},
				statusCode: 400,
			});
		}
		if (!inviteeEmail) {
			throw new ExpressError({
				message: 'Invitee email is required',
				status: 'error',
				data: {},
				statusCode: 400,
			});
		}
		if (!workspaceOwnerId) {
			throw new ExpressError({
				message: 'Workspace owner email is required',
				status: 'error',
				data: {},
				statusCode: 400,
			});
		}

		return Object.freeze({
			getInviteRole: () => inviteRoleId,
			getInviteeEmail: () => inviteeEmail,
			getInviteStatus: () => (status ? status : 'pending'),
			getWorkspaceOwnerId: () => workspaceOwnerId,
			getInviteNote: () => note,
			getWorkspaceId: () => workspaceId,
			getInviteeId: () => inviteeId,
		});
	};
}
