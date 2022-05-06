/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { INotification, INotificationRepository } from '../interfaces';
import NotificationModel from '@ostrich-app/features/notifications/models';

class NotificationRepository implements INotificationRepository{
	findByName = async (name: string) => {
		const Notification = await NotificationModel.findOne({ name });
		return Notification;
	};

	findById = async (id: string) => {
		const Notification = await NotificationModel.findById(id);
		return Notification;
	};

	findWorkspaceById = async (id: string) => {
		const workspace = await NotificationModel.findById(id);
		return workspace;
	};

	find = async (limit: number, page: number) => {
		const Notifications = await NotificationModel.find()
			.limit(limit)
			.skip(limit * (page - 1));
		return Notifications;
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

	move = async (destinationWorkspace: string, NotificationId: string) => {
		const movedNotification = await NotificationModel.findByIdAndUpdate(NotificationId, {
			workspace: destinationWorkspace,
		});
		return movedNotification;
	};

	copy = async (destinationWorkspace: string, NotificationData: INotification) => {
		const copiedNotification = await NotificationModel.create({
			...NotificationData,
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
