/* eslint-disable @typescript-eslint/no-explicit-any */
import { INotification, INotificationRepository, INotificationUseCases } from '../interfaces';

export class NotificationUseCase implements INotificationUseCases{
	constructor(private repository: INotificationRepository){}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	addNotification=async (notification: INotification) => {
		
		return await this.repository.comment('');
	};

	copyNotification=async (notificationData: INotification) => {

		await this.repository.createNotification('',notificationData as any);

		return {};
	};

	editNotification=async (notificationData: INotification) => {
		await this.repository.createNotification('',notificationData as any);

		return {};
	};

	listNotificationById=async (notificationData: INotification) => {
		await this.repository.createNotification('',notificationData as any);

		return {};
	};

	listNotificationByName=async (notificationData: INotification) => {
		await this.repository.createNotification('',notificationData as any);

		return {};
	};

	listNotifications=async (notificationData: INotification) => {
		await this.repository.createNotification('',notificationData as any);

		return {};
	};

	listWorkspaceNotifications=async (notificationData: INotification) => {
		await this.repository.createNotification('',notificationData as any);

		return {};
	};

	moveNotification=async (notificationData: INotification) => {
		await this.repository.createNotification('',notificationData as any);

		return {};
	};

	softRemoveNotification=async (notificationData: INotification) => {
		await this.repository.createNotification('',notificationData as any);

		return {};
	};

	hardRemoveNotification=async (notificationData: INotification) => {
		await this.repository.createNotification('',notificationData as any);

		return {};
	};
	
}
