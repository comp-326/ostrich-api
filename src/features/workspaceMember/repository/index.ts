/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IWorkspaceMember } from '../models/interfaces';
import { IWorkspaceMemberRepository } from './../interfaces';
import userModel from '@ostrich-app/features/users/models';
import workspaceInviteModel from '@ostrich-app/features/workspaceInvite/models';
import workspaceMemberModel from '../models';
import workspaceModel from '@ostrich-app/features/workspaces/models';
import workspaceRoleModel from '@ostrich-app/features/workspaceRoles/models';

class WorkspaceMemberRepository implements IWorkspaceMemberRepository {

	getWorkspaceMemberInvitation = async (inviteId: string) => {
		const invite = await workspaceInviteModel.findById(inviteId)!;

		return { ...invite!._doc, inviteRoleId: invite!._doc.inviteRoleId.toString(), workspaceId: invite!._doc.workspaceId.toString() };
	};


	getWorkspaceMemberByEmail = async (email: string) => {
		return userModel.findByEmail(email);
	};


	confirmInvite = async (inviteId: string) => {
		return await workspaceInviteModel.findByIdAndUpdate(
			inviteId,
			{
				status: 'confirmed',
			},
			{ new: true },
		);
	};

	getWorkspaceRoleById = async (roleId: string) => {
		const role = await workspaceRoleModel.findById(roleId)!;

		return { ...role!._doc, _id: role!._id.toString() };
	};

	getInviteById = async (inviteId: string) => {
		return await workspaceInviteModel.findById(inviteId);
	};


	getWorkspaceMember = async (workspaceMemberId: string) => {
		return await workspaceMemberModel.findById(workspaceMemberId);
	};

	getWorkspace = async (workspaceId: string) => {
		const workspace = await workspaceModel.findById(workspaceId);

		return { ...workspace!._doc, _id: workspace!._id.toString() };
	};

	getWorkspaceOwner = async (workspaceOwnerId: string) => {
		return await userModel.findById(workspaceOwnerId);
	};

	createNewWorkspaceMember = async (
		workspaceMemberData: IWorkspaceMember,
	) => {
		return workspaceMemberModel.create(workspaceMemberData);
	};

	findAll = async (workspaceId: string) => {
		return workspaceMemberModel.find({ workspaceId });
	};

	findMembersByRole = async (workspaceId: string, roleId: string) => {
		return await workspaceMemberModel.find({ workspaceId, roleId });
	};

	updateMemberRole = async (
		workspaceId: string,
		memberId: string,
		roleId: string,
	) => {
		return await workspaceMemberModel.findOneAndUpdate(
			{ workspaceId, memberId },
			{ roleId },
		);
	};

	deleteMember = async (workspaceMemberId: string) => {
		return await workspaceMemberModel.findByIdAndDelete(workspaceMemberId);
	};
}

export default new WorkspaceMemberRepository();
