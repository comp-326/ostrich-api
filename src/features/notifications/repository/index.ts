/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import NotificationModel from '@ostrich-app-features/notifications/models';
import { INotification, INotificationRepository } from '../interfaces';

class NotificationRepository implements INotificationRepository{
	findByName = async (name: string) => {
		const notification = await NotificationModel.findOne({ name });

		return notification;
	};

	findById = async (id: string) => {
		const notification = await NotificationModel.findById(id);

		return notification;
	};

	findWorkspaceById = async (id: string) => {
		const workspace = await NotificationModel.findById(id);

		return workspace;
	};

	find = async (limit: number, page: number) => {
		const notifications = await NotificationModel.find()
			.limit(limit)
			.skip(limit * (page - 1));

		return notifications;
	};

	findWorkspaceNotifications = async (
		workspaceId: string,
		limit: number,
		page: number,
	) => {
		const workspaceNotifications = await NotificationModel.find({
			workspace: workspaceId,
		})
			.limit(limit)
			.skip(limit * (page - 1));

		return workspaceNotifications;
	};

	updateById = async (id: string, data: INotification) => {
		const editedNotification = await NotificationModel.findByIdAndUpdate(
			id,
			{ ...data },
			{ new: true },
		);

		return editedNotification;
	};

	deleteById = async (id: string) => {
		await NotificationModel.findByIdAndDelete(id);

		return true;
	};

	comment: (id: string) => Promise<any>;

	like: (userId: string, id: string) => Promise<any>;

	move = async (destinationWorkspace: string, notificationId: string) => {
		const movedNotification = await NotificationModel.findByIdAndUpdate(notificationId, {
			workspace: destinationWorkspace,
		});

		return movedNotification;
	};

	copy = async (destinationWorkspace: string, notificationData: INotification) => {
		const copiedNotification = await NotificationModel.create({
			...notificationData,
			workspace: destinationWorkspace,
		});

		return copiedNotification;
	};

	createNotification = async (workspaceId: string, data: INotification) => {
		const newNotification = await NotificationModel.create({
			...data,
			workspace: workspaceId,
		});

		return newNotification;
	};
}

export default new NotificationRepository();
