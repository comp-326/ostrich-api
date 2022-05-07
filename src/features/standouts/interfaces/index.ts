import { INext,IRequest, IResponse } from '@ostrich-app-common/types';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IStandout {
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

export interface IStandoutRequest {
	params: any;
	body: any;
	query: any;
	headers: any;
	files?: any;
	file?: any;
}

export interface IStandoutRepository {
	createStandout: (workspaceId: string, data: IStandout) => Promise<any>;
	findByName: (name: string) => Promise<any>;
	findById: (id: string) => Promise<any>;
	findWorkspaceById: (id: string) => Promise<any>;
	find: (limit: number, page: number) => Promise<any>;
	findWorkspaceStandouts: (
		workspaceId: string,
		limit: number,
		page: number
	) => Promise<any>;
	updateById: (id: string, data: IStandout) => Promise<any>;
	deleteById: (id: string) => Promise<any>;
	comment: (id: string) => Promise<any>;
	like: (userId: string, id: string) => Promise<any>;
	move: (destinationWorkspace: string, StandoutId: string) => Promise<any>;
	copy: (destinationWorkspace: string, StandoutData: IStandout) => Promise<any>;
}

export interface IStandoutValidator {
	isValidStandout: (email: string) => boolean;
}

export interface IStandoutUseCases {
	addStandout: (StandoutData: IStandout) => Promise<any>;
	copyStandout: (StandoutData: IStandout) => Promise<any>;
	editStandout: (StandoutData: IStandout) => Promise<any>;
	listStandoutById: (StandoutData: IStandout) => Promise<any>;
	listStandoutByName: (StandoutData: IStandout) => Promise<any>;
	listStandouts: (StandoutData: IStandout) => Promise<any>;
	listWorkspaceStandouts: (StandoutData: IStandout) => Promise<any>;
	moveStandout: (StandoutData: IStandout) => Promise<any>;
	softRemoveStandout: (StandoutData: IStandout) => Promise<any>;
	hardRemoveStandout: (StandoutData: IStandout) => Promise<any>;
}

export interface IStandoutController {
	softDelete:(req:IRequest,res:IResponse,next:INext) => Promise<any>
	findById:(req:IRequest,res:IResponse,next:INext) => Promise<any>
	findStandouts:(req:IRequest,res:IResponse,next:INext) => Promise<any>
	findByName:(req:IRequest,res:IResponse,next:INext) => Promise<any>
	findWorkspaceStandouts:(req:IRequest,res:IResponse,next:INext) => Promise<any>
	createStandout:(req:IRequest,res:IResponse,next:INext) => Promise<any>
	copyStandout:(req:IRequest,res:IResponse,next:INext) => Promise<any>
	updateStandout:(req:IRequest,res:IResponse,next:INext) => Promise<any>
	moveStandout:(req:IRequest,res:IResponse,next:INext) => Promise<any>
	hardDeleteStandout:(req:IRequest,res:IResponse,next:INext) => Promise<any>
}
