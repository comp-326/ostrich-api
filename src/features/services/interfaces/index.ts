/* eslint-disable @typescript-eslint/no-explicit-any */
import { INext, IRequest, IResponse } from '@ostrich-app/common/types';

export interface IServices {
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

export interface IServicesRequest {
	params: any;
	body: any;
	query: any;
	headers: any;
	files?: any;
	file?: any;
}

export interface IServicesRepository {
	createServices: (workspaceId: string, data: IServices) => Promise<any>;
	findByName: (name: string) => Promise<any>;
	findById: (id: string) => Promise<any>;
	findWorkspaceById: (id: string) => Promise<any>;
	find: (limit: number, page: number) => Promise<any>;
	findWorkspaceServicess: (
		workspaceId: string,
		limit: number,
		page: number
	) => Promise<any>;
	updateById: (id: string, data: IServices) => Promise<any>;
	deleteById: (id: string) => Promise<any>;
	comment: (id: string) => Promise<any>;
	like: (userId: string, id: string) => Promise<any>;
	move: (destinationWorkspace: string, ServicesId: string) => Promise<any>;
	copy: (destinationWorkspace: string, ServicesData: IServices) => Promise<any>;
}

export interface IServicesValidator {
	isValidServices: (email: string) => boolean;
}

export interface IServicesUseCases {
	addServices: (ServicesData: IServices) => Promise<any>;
	copyServices: (ServicesData: IServices) => Promise<any>;
	editServices: (ServicesData: IServices) => Promise<any>;
	listServicesById: (ServicesData: IServices) => Promise<any>;
	listServicesByName: (ServicesData: IServices) => Promise<any>;
	listServicess: (ServicesData: IServices) => Promise<any>;
	listWorkspaceServicess: (ServicesData: IServices) => Promise<any>;
	moveServices: (ServicesData: IServices) => Promise<any>;
	softRemoveServices: (ServicesData: IServices) => Promise<any>;
	hardRemoveServices: (ServicesData: IServices) => Promise<any>;
}

export interface IServicesController {
	softDelete: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	findById: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	findServicess: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	findByName: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	findWorkspaceServicess: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	createServices: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	copyServices: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	updateService: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	moveServices: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	hardDeleteServices: (req: IRequest, res: IResponse, next: INext) => Promise<any>
}
