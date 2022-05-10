import { ExpressError } from '@ostrich-app/common/errors/ExpressError';
import { IWorkspaceMember } from '../models/interfaces';

export default function makeCreateNewWorkspaceMember() {
	return (data: IWorkspaceMember) => {
		if (!data.memberEmail) {
			throw new ExpressError({
				message: 'Member email is required',
				status: 'warning',
				data: {},
				statusCode: 400,
			});
		}
		if (!data.workspaceId) {
			throw new ExpressError({
				message: 'Workspace id is required',
				status: 'warning',
				data: {},
				statusCode: 400,
			});
		}
		if (!data.memberRoleId) {
			throw new ExpressError({
				message: 'Role id is required',
				status: 'warning',
				data: {},
				statusCode: 400,
			});
		}
		if (!data.memberId) {
			throw new ExpressError({
				message: 'Member id is required',
				data: {},
				status: 'warning',
				statusCode: 400,
			});
		}

		return Object.freeze({
			getMemberId: () => data.memberId,
			getMemberEmail: () => data.memberEmail,
			getMemberPhone: () => data.memberPhone,
			getMemberRoleId: () => data.memberRoleId,
			getWorkspaceId: () => data.workspaceId,
			getWorkspaceOwnerId: () => data.workspaceOwnerId,
			getWorkspaceOwnerEmail: () => data.workspaceOwnerEmail,
			getWorkspaceOwnerPhone: () => data.workspaceOwnerPhone,
		});
	};
}
