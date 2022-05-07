import { INext, IRequest,IResponse } from '@ostrich-app/common/types';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface INotification {
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

export interface INotificationRequest {
	params: any;
	body: any;
	query: any;
	headers: any;
	files?: any;
	file?: any;
}

export interface INotificationRepository {
	createNotification: (workspaceId: string, data: INotification) => Promise<any>;
	findByName: (name: string) => Promise<any>;
	findById: (id: string) => Promise<any>;
	findWorkspaceById: (id: string) => Promise<any>;
	find: (limit: number, page: number) => Promise<any>;
	findWorkspaceNotifications: (
		workspaceId: string,
		limit: number,
		page: number
	) => Promise<any>;
	updateById: (id: string, data: INotification) => Promise<any>;
	deleteById: (id: string) => Promise<any>;
	comment: (id: string) => Promise<any>;
	like: (userId: string, id: string) => Promise<any>;
	move: (destinationWorkspace: string, NotificationId: string) => Promise<any>;
	copy: (destinationWorkspace: string, NotificationData: INotification) => Promise<any>;
}

export interface INotificationValidator {
	isValidNotification: (email: string) => boolean;
}

export interface INotificationUseCases {
	addNotification: (NotificationData: INotification) => Promise<any>;
	copyNotification: (NotificationData: INotification) => Promise<any>;
	editNotification: (NotificationData: INotification) => Promise<any>;
	listNotificationById: (NotificationData: INotification) => Promise<any>;
	listNotificationByName: (NotificationData: INotification) => Promise<any>;
	listNotifications: (NotificationData: INotification) => Promise<any>;
	listWorkspaceNotifications: (NotificationData: INotification) => Promise<any>;
	moveNotification: (NotificationData: INotification) => Promise<any>;
	softRemoveNotification: (NotificationData: INotification) => Promise<any>;
	hardRemoveNotification: (NotificationData: INotification) => Promise<any>;
}

export interface INotificationController {
	softDelete:(req:IRequest,res:IResponse,next:INext) => Promise<any>
	findById:(req:IRequest,res:IResponse,next:INext) => Promise<any>
	findNotifications:(req:IRequest,res:IResponse,next:INext) => Promise<any>
	findByName:(req:IRequest,res:IResponse,next:INext) => Promise<any>
	findWorkspaceNotifications:(req:IRequest,res:IResponse,next:INext) => Promise<any>
	createNotification:(req:IRequest,res:IResponse,next:INext) => Promise<any>
	copyNotification:(req:IRequest,res:IResponse,next:INext) => Promise<any>
	updateNotification:(req:IRequest,res:IResponse,next:INext) => Promise<any>
	moveNotification:(req:IRequest,res:IResponse,next:INext) => Promise<any>
	hardDeleteNotification:(req:IRequest,res:IResponse,next:INext) => Promise<any>
}
