/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IComments, ICommentsRepository } from '../interfaces';
import CommentsModel from '@ostrich-app/features/comments/models';

class CommentsRepository implements ICommentsRepository{
	findByName = async (name: string) => {
		const Comments = await CommentsModel.findOne({ name });
		return Comments;
	};

	findById = async (id: string) => {
		const Comments = await CommentsModel.findById(id);
		return Comments;
	};

	findWorkspaceById = async (id: string) => {
		const workspace = await CommentsModel.findById(id);
		return workspace;
	};

	find = async (limit: number, page: number) => {
		const Commentss = await CommentsModel.find()
			.limit(limit)
			.skip(limit * (page - 1));
		return Commentss;
	};

	findWorkspaceCommentss = async (
		workspaceId: string,
		limit: number,
		page: number,
	) => {
		const workspaceCommentss = await CommentsModel.find({
			workspace: workspaceId,
		})
			.limit(limit)
			.skip(limit * (page - 1));
		return workspaceCommentss;
	};

	updateById = async (id: string, data: IComments) => {
		const editedComments = await CommentsModel.findByIdAndUpdate(
			id,
			{ ...data },
			{ new: true },
		);
		return editedComments;
	};

	deleteById = async (id: string) => {
		await CommentsModel.findByIdAndDelete(id);
		return true;
	};

	comment: (id: string) => Promise<any>;

	like: (userId: string, id: string) => Promise<any>;

	move = async (destinationWorkspace: string, CommentsId: string) => {
		const movedComments = await CommentsModel.findByIdAndUpdate(CommentsId, {
			workspace: destinationWorkspace,
		});
		return movedComments;
	};

	copy = async (destinationWorkspace: string, CommentsData: IComments) => {
		const copiedComments = await CommentsModel.create({
			...CommentsData,
			workspace: destinationWorkspace,
		});
		return copiedComments;
	};

	createComments = async (workspaceId: string, data: IComments) => {
		const newComments = await CommentsModel.create({
			...data,
			workspace: workspaceId,
		});
		return newComments;
	};
}

export default new CommentsRepository();
