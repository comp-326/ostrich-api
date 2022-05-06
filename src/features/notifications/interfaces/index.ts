import { INext, IResponse } from '@ostrich-app/common/types';
import IRequest from '@ostrich-app/common/interfaces/request';

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
	softDelete= async(req:IRequest:IRequest,res:IResponse,next:INext) => {return res.status(200).json({working:"OK"})
	findById= async(req:IRequest:IRequest,res:IResponse,next:INext) => {return res.status(200).json({working:"OK"})
	findNotifications= async(req:IRequest:IRequest,res:IResponse,next:INext) => {return res.status(200).json({working:"OK"})
	findByName= async(req:IRequest:IRequest,res:IResponse,next:INext) => {return res.status(200).json({working:"OK"})
	findWorkspaceNotifications= async(req:IRequest:IRequest,res:IResponse,next:INext) => {return res.status(200).json({working:"OK"})
	createNotification= async(req:IRequest:IRequest,res:IResponse,next:INext) => {return res.status(200).json({working:"OK"})
	copyNotification= async(req:IRequest:IRequest,res:IResponse,next:INext) => {return res.status(200).json({working:"OK"})
	updateNotification:(req:IRequest,res:IResponse,next:INext) => {return res.status(200).json({working:"OK"})
	moveNotification= async(req:IRequest:IRequest,res:IResponse,next:INext) => {return res.status(200).json({working:"OK"})
	hardDeleteNotification= async(req:IRequest:IRequest,res:IResponse,next:INext) => {return res.status(200).json({working:"OK"})
}
