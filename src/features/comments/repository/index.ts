/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import commentsModel from '@ostrich-app/features/comments/models';
import { IComments, ICommentsRepository } from '../interfaces';

class CommentsRepository implements ICommentsRepository{
	createComments: (workspaceId: string, data: IComments) => Promise<any>;

	findWorkspaceCommentss: (workspaceId: string, limit: number, page: number) => Promise<any>;

	findByName = async (name: string) => {
		const comments = await commentsModel.findOne({ name });

		return comments;
	};

	findById = async (id: string) => {
		const comments = await commentsModel.findById(id);

		return comments;
	};

	findWorkspaceById = async (id: string) => {
		const workspace = await commentsModel.findById(id);

		return workspace;
	};

	find = async (limit: number, page: number) => {
		const commentss = await commentsModel.find()
			.limit(limit)
			.skip(limit * (page - 1));

		return commentss;
	};

	findWorkspacecommentss = async (
		workspaceId: string,
		limit: number,
		page: number,
	) => {
		const workspacecommentss = await commentsModel.find({
			workspace: workspaceId,
		})
			.limit(limit)
			.skip(limit * (page - 1));

		return workspacecommentss;
	};

	updateById = async (id: string, data: IComments) => {
		const editedcomments = await commentsModel.findByIdAndUpdate(
			id,
			{ ...data },
			{ new: true },
		);

		return editedcomments;
	};

	deleteById = async (id: string) => {
		await commentsModel.findByIdAndDelete(id);

		return true;
	};

	comment: (id: string) => Promise<any>;

	like: (userId: string, id: string) => Promise<any>;

	move = async (destinationWorkspace: string, commentsId: string) => {
		const movedcomments = await commentsModel.findByIdAndUpdate(commentsId, {
			workspace: destinationWorkspace,
		});

		return movedcomments;
	};

	copy = async (destinationWorkspace: string, commentsData: IComments) => {
		const copiedcomments = await commentsModel.create({
			...commentsData,
			workspace: destinationWorkspace,
		});

		return copiedcomments;
	};

	createcomments = async (workspaceId: string, data: IComments) => {
		const newcomments = await commentsModel.create({
			...data,
			workspace: workspaceId,
		});

		return newcomments;
	};
}

export default new CommentsRepository();
