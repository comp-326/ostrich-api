import { INext, IRequest,IResponse } from '@ostrich-app/common/types';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IAppointment {
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

export interface IAppointmentRequest {
	params: any;
	body: any;
	query: any;
	headers: any;
	files?: any;
	file?: any;
}

export interface IAppointmentRepository {
	createAppointment: (workspaceId: string, data: IAppointment) => Promise<any>;
	findByName: (name: string) => Promise<any>;
	findById: (id: string) => Promise<any>;
	findWorkspaceById: (id: string) => Promise<any>;
	find: (limit: number, page: number) => Promise<any>;
	findWorkspaceAppointments: (
		workspaceId: string,
		limit: number,
		page: number
	) => Promise<any>;
	updateById: (id: string, data: IAppointment) => Promise<any>;
	deleteById: (id: string) => Promise<any>;
	comment: (id: string) => Promise<any>;
	like: (userId: string, id: string) => Promise<any>;
	move: (destinationWorkspace: string, folderId: string) => Promise<any>;
	copy: (destinationWorkspace: string, folderData: IAppointment) => Promise<any>;
}

export interface IAppointmentValidator {
	isValidAppointment: (email: string) => boolean;
}

export interface IAppointmentUseCases {
	addAppointment: (folderData: IAppointment) => Promise<any>;
	copyAppointment: (folderData: IAppointment) => Promise<any>;
	editAppointment: (folderData: IAppointment) => Promise<any>;
	listAppointmentById: (folderData: IAppointment) => Promise<any>;
	listAppointmentByName: (folderData: IAppointment) => Promise<any>;
	listAppointments: (folderData: IAppointment) => Promise<any>;
	listWorkspaceAppointments: (folderData: IAppointment) => Promise<any>;
	moveAppointment: (folderData: IAppointment) => Promise<any>;
	softRemoveAppointment: (folderData: IAppointment) => Promise<any>;
	hardRemoveAppointment: (folderData: IAppointment) => Promise<any>;
}

export interface IAppointmentController {
	softDelete: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	findById: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	findAppointments: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	findByName: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	findWorkspaceAppointments: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	createAppointment: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	copyAppointment: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	updateAppointment: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	moveAppointment: (req: IRequest, res: IResponse, next: INext) => Promise<any>
	hardDeleteAppointment: (req: IRequest, res: IResponse, next: INext) => Promise<any>
}
