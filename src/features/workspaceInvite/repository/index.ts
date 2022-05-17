import { IWorkspaceInvite } from '../models/interfaces';
import { IWorkspaceInviteRepository } from '../interfaces';
import workspaceInviteModel from './../models';
import workspaceModel from '@ostrich-app/features/workspaces/models';
import workspaceRoleModel from '@ostrich-app/features/workspaceRoles/models';

class WorkspaceInviteRepository implements IWorkspaceInviteRepository {

	updateInviteById = async (inviteId: string, inviteData: IWorkspaceInvite) => {
		const invite = await workspaceInviteModel.findByIdAndUpdate(inviteId, inviteData, { new: true });

		return invite;
	};

	getWorkspaceRole = async (roleId: string) => {
		if (!(await workspaceRoleModel.getDefaultRole()))
			await workspaceRoleModel.InsertRoles();

		return workspaceRoleModel.findById(roleId);
	};

	getInviteById = async (id: string) => {
		const invite = await workspaceInviteModel.findById(id);

		return invite;
	};

	getInviteWorkspace = async (workspaceId: string) => {
		const workspace = await workspaceModel.findById(workspaceId);

		return workspace;
	};

	getUserInvite = async (userEmail: string, workspaceId: string) => {
		const invite = await workspaceInviteModel.findOne({
			userEmail, workspaceId
		});

		return invite;
	};

	createInvite = async (inviteData: IWorkspaceInvite) => {
		const invite = await workspaceInviteModel.create({
			...inviteData
		});

		return invite;
	};

	deleteInvite = async (workspaceId: string) => {
		const deletedInvite = await workspaceInviteModel.deleteOne({ workspaceId });

		return deletedInvite;
	};

	updateInvite = async () => {
		return {};
	};

	getConfirmed = async (workspaceId: string) => {
		const invites = await workspaceInviteModel.find({ workspaceId, status: 'confirmed' });

		return invites;
	};

	getPending = async (workspaceId: string) => {
		const invites = await workspaceInviteModel.find({ workspaceId, status: 'pending' });

		return invites;
	};

	confirmInvite = async (inviteId: string) => {
		const invite = await workspaceInviteModel.findByIdAndUpdate(inviteId, { status: 'confirmed' });

		return invite;
	};


}

export default new WorkspaceInviteRepository();