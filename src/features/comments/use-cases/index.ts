/* eslint-disable @typescript-eslint/no-explicit-any */
import { IComments, ICommentsRepository, ICommentsUseCases } from '@ostrich-app/features/comments/interfaces';


export class CommentsUseCase implements ICommentsUseCases{
	constructor(private readonly repository: ICommentsRepository){ }

	addComments = async (commentsData: IComments) => {
		await this.repository.createComments('',commentsData);

		return { woing: 'OK' };
	};

	copyComments = async (commentsData: IComments) => {
		await this.repository.createComments('',commentsData);

		return { woing: 'OK' };
	};

	editComments = async (commentsData: IComments) => {
		await this.repository.createComments('',commentsData);

		return { woing: 'OK' };
	};

	listCommentsById = async (commentsData: IComments) => {
		await this.repository.createComments('',commentsData);

		return { woing: 'OK' };
	};

	listCommentsByName = async (commentsData: IComments) => {
		await this.repository.createComments('',commentsData);

		return { woing: 'OK' };
	};

	listCommentss = async (commentsData: IComments) => {
		await this.repository.createComments('',commentsData);

		return { woing: 'OK' };
	};

	listWorkspaceCommentss = async (commentsData: IComments) => {
		await this.repository.createComments('',commentsData);

		return { woing: 'OK' };
	};

	moveComments = async (commentsData: IComments) => {
		await this.repository.createComments('',commentsData);

		return { woing: 'OK' };
	};

	softRemoveComments = async (commentsData: IComments) => {
		await this.repository.createComments('',commentsData);

		return { woing: 'OK' };
	};

	hardRemoveComments = async (commentsData: IComments) => {
		await this.repository.createComments('',commentsData);

		return { woing: 'OK' };
	};

}