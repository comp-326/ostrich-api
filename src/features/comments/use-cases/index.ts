/* eslint-disable @typescript-eslint/no-explicit-any */
import { IComments, ICommentsRepository, ICommentsUseCases } from '@ostrich-app/features/comments/interfaces';


export class CommentsUseCase implements ICommentsUseCases{
	constructor(repository: ICommentsRepository){ }
	addComments = async (CommentsData: IComments) => {
		return { woing: 'OK' };
	};
	copyComments = async (CommentsData: IComments) => {
		return { woing: 'OK' };
	};
	editComments = async (CommentsData: IComments) => {
		return { woing: 'OK' };
	};
	listCommentsById = async (CommentsData: IComments) => {
		return { woing: 'OK' };
	};
	listCommentsByName = async (CommentsData: IComments) => {
		return { woing: 'OK' };
	};
	listCommentss = async (CommentsData: IComments) => {
		return { woing: 'OK' };
	};
	listWorkspaceCommentss = async (CommentsData: IComments) => {
		return { woing: 'OK' };
	};
	moveComments = async (CommentsData: IComments) => {
		return { woing: 'OK' };
	};
	softRemoveComments = async (CommentsData: IComments) => {
		return { woing: 'OK' };
	};
	hardRemoveComments = async (CommentsData: IComments) => {
		return { woing: 'OK' };
	};

}