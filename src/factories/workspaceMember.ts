/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ExpressError } from '@ostrich-app/common/errors/ExpressError';
import createNewWorkspaceMember from '@ostrich-app/features/workspaceMember/entities';
import userModel from '@ostrich-app/features/users/models';
import validateMongodbId from '@ostrich-app/utils/mongo/ObjectId-validator';
import  workspaceMemberModel  from '@ostrich-app-features/workspaceMember/models';
import workspaceModel from '@ostrich-app/features/workspaces/models';
import workspaceRoleRoleModel from '@ostrich-app/features/workspaceRoles/models';

export function workspaceMemberFactory() {
	return async (roleId: string, memberEmail: string, workspaceId: string) => {
      
		if (!roleId) {
			throw new ExpressError({
				message: 'Role is required',
				status: 'warning'
				,
				data: {},
				statusCode: 400
			});
		}
		if (!memberEmail) {
			throw new ExpressError({
				message: 'Member Email is required',
				status: 'warning'
				,
				data: {},
				statusCode: 400
			});
		}
		if (!workspaceId) {
			throw new ExpressError({
				message: 'Workspace is required',
				status: 'warning'
				,
				data: {},
				statusCode: 400
			});
		}
		if (!validateMongodbId(roleId)) {
			throw new ExpressError({
				message: 'Invalid Role Id',
				status: 'warning'
				,
				data: {},
				statusCode: 400,
			});
		}
		if (!validateMongodbId(workspaceId)) {
			throw new ExpressError({
				message: 'Invalid Workspace Id',
				status: 'warning',
				data: {},
				statusCode: 400,
			});
		}  const existingMember = await workspaceMemberModel.findOne({
			memberEmail,
			workspaceId,
			memberRole: roleId
		});
		if(existingMember){
			throw new ExpressError({
				message: 'Member already exists',
				status: 'warning',
				data: {},
				statusCode: 409,
			});}
		const member = await userModel.findOne({
			email: memberEmail,
		});
		const workspace = await workspaceModel.findById(workspaceId);
		const role = await workspaceRoleRoleModel.findById(roleId)!;
		const { getMember, getMemberEmail, getMemberRole, getWorkspaceId } = createNewWorkspaceMember({
			member: member!._id,
			memberEmail: member!.email,
			memberRole: role!._id,
			workspaceId: workspace!._id,
		});

		return {
			member: getMember(),
			memberEmail: getMemberEmail(),
			memberRole: getMemberRole(),
			workspaceId: getWorkspaceId()
		};
	};
}
