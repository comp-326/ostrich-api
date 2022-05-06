/* eslint-disable @typescript-eslint/no-explicit-any */
import { INotification, INotificationRepository, INotificationUseCases } from '../interfaces';

export class NotificationUseCase implements INotificationUseCases{
	constructor(private repository: INotificationRepository){}
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	addNotification=async (notification: INotification) => {
		
		return await this.repository.comment('');
	};
	copyNotification: (notification: INotification) => Promise<any>;
	editNotification: (NotificationData: INotification) => Promise<any>;
	listNotificationById: (NotificationData: INotification) => Promise<any>;
	listNotificationByName: (NotificationData: INotification) => Promise<any>;
	listNotifications: (NotificationData: INotification) => Promise<any>;
	listWorkspaceNotifications: (NotificationData: INotification) => Promise<any>;
	moveNotification: (NotificationData: INotification) => Promise<any>;
	softRemoveNotification: (NotificationData: INotification) => Promise<any>;
	hardRemoveNotification: (NotificationData: INotification) => Promise<any>;
	
}
