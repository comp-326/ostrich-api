import {IRequest} from '@ostrich-app/common/types';
import { INext, IResponse } from '@ostrich-app/common/types';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IComments {
	name: string;
	isStandout: boolean;
	type: string;
	size: string;
	views: number;
	likes: number;
	address: {
		location: string;
		country: string;
		loactionType: string;
	};
	images: { public_id: string; url: string }[];

	finance: {
		tuitionFeeUnderGraduate: number;
		tuitionFeePostGraduate: number;
		tuitionFeePostDeposit: number;
		tuitionPricingCategory: string;
		currency: string;
		scholarshipAverage: string;
		scholarshipChances: string;
		internationalFeeDiferential: number;
	};
	prompts: string[];
	comments: string[];
}

export interface ICommentsRequest {
	params: any;
	body: any;
	query: any;
	headers: any;
	files?: any;
	file?: any;
}

export interface ICommentsRepository {
	createComments: (workspaceId: string, data: IComments) => Promise<any>;
	findByName: (name: string) => Promise<any>;
	findById: (id: string) => Promise<any>;
	findWorkspaceById: (id: string) => Promise<any>;
	find: (limit: number, page: number) => Promise<any>;
	findWorkspaceCommentss: (
		workspaceId: string,
		limit: number,
		page: number
	) => Promise<any>;
	updateById: (id: string, data: IComments) => Promise<any>;
	deleteById: (id: string) => Promise<any>;
	comment: (id: string) => Promise<any>;
	like: (userId: string, id: string) => Promise<any>;
	move: (destinationWorkspace: string, CommentsId: string) => Promise<any>;
	copy: (destinationWorkspace: string, CommentsData: IComments) => Promise<any>;
}

export interface ICommentsValidator {
	isValidComments: (email: string) => boolean;
}

export interface ICommentsUseCases {
	addComments: (CommentsData: IComments) => Promise<any>;
	copyComments: (CommentsData: IComments) => Promise<any>;
	editComments: (CommentsData: IComments) => Promise<any>;
	listCommentsById: (CommentsData: IComments) => Promise<any>;
	listCommentsByName: (CommentsData: IComments) => Promise<any>;
	listCommentss: (CommentsData: IComments) => Promise<any>;
	listWorkspaceCommentss: (CommentsData: IComments) => Promise<any>;
	moveComments: (CommentsData: IComments) => Promise<any>;
	softRemoveComments: (CommentsData: IComments) => Promise<any>;
	hardRemoveComments: (CommentsData: IComments) => Promise<any>;
}

export interface ICommentsController {
	softDelete: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	findById: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	findCommentss: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	findByName: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	findWorkspaceCommentss: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	createComments: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	copyComments: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	updateComments: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	moveComments: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	hardDeleteComments: (req: IRequest, res: IResponse, next: INext) => Promise<any>
}
