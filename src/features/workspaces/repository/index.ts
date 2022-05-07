/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IWorkspace } from '@ostrich-app/features/workspaces/models/interfaces';
import { IWorkspaceRepository } from '@ostrich-app/features/workspaces/interfaces';
import WorkspaceModel from '@ostrich-app/features/workspaces/models';
import { generateGravatarUrl } from '@ostrich-app/common/gravatar';
import mediaModel from '@ostrich-app/features/media/models';

class WorkspaceRepository implements IWorkspaceRepository {
	findAll = async (limit: number, page: number) => {

		return {limit,page};
	};

	findUserWorkspaces = async (
		userId: string,
		limit: number,
		page: number,
	) => {
		return {userId,limit,page};
	};

	findByName = async (name: string) => {
		const folder = await WorkspaceModel.findOne({ name });

		return folder;
	};

	findById = async (id: string) => {
		const folder = await WorkspaceModel.findById(id);

		return folder;
	};

	findWorkspaceById = async (id: string) => {
		const workspace = await WorkspaceModel.findById(id);

		return workspace;
	};

	find = async (limit: number, page: number) => {
		const folders = await WorkspaceModel.find()
			.limit(limit)
			.skip(limit * (page - 1));

		return folders;
	};

	findWorkspaceWorkspaces = async (
		workspaceId: string,
		limit: number,
		page: number,
	) => {
		const workspaceWorkspaces = await WorkspaceModel.find({
			workspace: workspaceId,
		})
			.limit(limit)
			.skip(limit * (page - 1));

		return workspaceWorkspaces;
	};

	updateById = async (id: string, data: IWorkspace) => {
		const editedWorkspace = await WorkspaceModel.findByIdAndUpdate(
			id,
			{ ...data },
			{ new: true },
		);

		return editedWorkspace;
	};

	deleteById = async (id: string) => {
		await WorkspaceModel.findByIdAndDelete(id);

		return true;
	};

	comment: (id: string) => Promise<any>;

	like: (userId: string, id: string) => Promise<any>;

	move = async (destinationWorkspace: string, folderId: string) => {
		const movedWorkspace = await WorkspaceModel.findByIdAndUpdate(
			folderId,
			{
				workspace: destinationWorkspace,
			},
		);

		return movedWorkspace;
	};

	copy = async (destinationWorkspace: string, folderData: IWorkspace) => {
		const copiedWorkspace = await WorkspaceModel.create({
			...folderData,
			workspace: destinationWorkspace,
		});

		return copiedWorkspace;
	};

	createWorkspace = async (data: IWorkspace) => {
		const logo = await mediaModel.create({
			type: 'logo',
			mediaType:'image',
			size:200,
			uploadId:data.name,
			url:generateGravatarUrl(data.name),
		});
		const newWorkspace = await WorkspaceModel.create({ ...data,logo });

		return newWorkspace;
	};
}

export default new WorkspaceRepository();
