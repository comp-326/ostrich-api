/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserDocumentType } from '@ostrich-models/Users/UserModel';
import WorkspaceModel from '@ostrich-models/Workspace/WorkspaceModel';
import { IWorkspaceEntity, IWorkspaceRepository } from '@ostrich-domains/Workspace/interfaces';

class WorkspaceRepository implements IWorkspaceRepository {
	create = async (workspace: IWorkspaceEntity) => {
		const newWorkspace = await WorkspaceModel.create({
			...workspace,
			$push: { members: workspace.owner, admins: workspace.owner },
		});
		return newWorkspace;
	};
	findById = async (id: string) => {
		const workspace = await WorkspaceModel.findById(id);
		return workspace;
	};
	findUserWorkspaces = async (userId: string) => {
		const workspaces = await WorkspaceModel.find({
			$in: { members: [userId] },
		})
			.populate('members', 'firstName lastName -_id email')
			.populate('admins', 'firstName lastName -_id email')
			.populate('creators', 'firstName lastName -_id email')
			.populate('creatorLites', 'firstName lastName -_id email');

		return workspaces;
	};
	find = async (
		limit: number,
		offset: number,
		_query?: { [x: string]: any } | undefined,
	) => {
		const workspaces = await WorkspaceModel.find(
			{},
			{
				id: 1,
				name: 1,
				date_created: { $month: '$createdAt' },
				number_of_members: { $size: '$members' },
				number_of_creators: { $size: '$creators' },
				number_of_creator_lites: {
					$size: '$creatorLites',
				},
				year_created: { $year: '$createdAt' },
			},
			{ count: { $size: 'allDocuments' } },
		)
			.skip((Number(offset) - 1) * Number(limit))
			.limit(Number(limit))
			.populate('members', 'firstName lastName -_id email')
			.populate('admins', 'firstName lastName -_id email')
			.populate('creators', 'firstName lastName -_id email')
			.populate('creatorLites', 'firstName lastName -_id email');

		return workspaces;
	};
	delete = async (id: string) => {
		const workspace = await WorkspaceModel.findByIdAndDelete(id);
		return { deleted: true, workspace };
	};
	updateById = async (id: string, data: IWorkspaceEntity) => {
		const workspace = await WorkspaceModel.findByIdAndUpdate(
			id,
			{
				...data,
			},
			{ new: true },
		);
		return workspace;
	};
	changeUserRole = async (
		userId: string,
		workspaceId: string,
		role: string,
	) => {
		const workspace = await WorkspaceModel.findById(workspaceId)!
			.populate('members')
			.populate('admins')
			.populate('creators')
			.populate('creatorLites');
		if (role.toLowerCase() === 'admin') {
			if (
				workspace!.creatorLites.some(function (
					user: Partial<UserDocumentType>,
				) {
					return user._id === userId;
				})
			) {
				await workspace!.updateOne({
					$pull: { creatorLites: { $in: [userId] } },
				});
			}
			if (
				workspace!.creators.some(
					(user: Partial<UserDocumentType>) => user._id === userId,
				)
			) {
				await workspace!.updateOne({
					$pull: { creators: { $in: [userId] } },
				});
			}
			if (
				workspace!.admins.some(
					(user: Partial<UserDocumentType>) => user._id === userId,
				)
			)
				await workspace!.updateOne({ $push: { admins: userId } });
		}
		if (role.toLowerCase() === 'creator') {
			if (
				workspace!.admins.some(
					(user: Partial<UserDocumentType>) => user._id === userId,
				)
			) {
				await workspace!.updateOne({
					$pull: { creatorLites: { $in: [userId] } },
				});
			}
			if (
				workspace!.creatorLites.some(
					(user: Partial<UserDocumentType>) => user._id === userId,
				)
			) {
				await workspace!.updateOne({
					$pull: { creatorLites: { $in: [userId] } },
				});
			}
			if (
				workspace!.creators.some(
					(user: Partial<UserDocumentType>) => user._id === userId,
				)
			)
				await workspace!.updateOne({ $push: { creators: userId } });
		}
		if (role.toLowerCase() === 'creator_lite') {
			if (
				workspace!.admins.some(
					(user: Partial<UserDocumentType>) => user._id === userId,
				)
			) {
				await workspace!.updateOne({
					$pull: { admins: { $in: [userId] } },
				});
			}
			if (
				workspace!.creators.some(
					(user: Partial<UserDocumentType>) => user._id === userId,
				)
			) {
				await workspace!.updateOne({
					$pull: { creators: { $in: [userId] } },
				});
			}
			if (
				workspace!.creatorLites.some(
					(user: Partial<UserDocumentType>) => user._id === userId,
				)
			)
				await workspace!.updateOne({ $push: { admins: userId } });
		}
		return workspace;
	};
}

export default new WorkspaceRepository();
