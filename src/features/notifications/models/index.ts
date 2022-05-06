/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from '@ostrich-app/db/mongodb';

const NotificationSchema: mongoose.Schema<any> = new mongoose.Schema({
	name: String
});

const NotificationModel = mongoose.model<any>('Notification', NotificationSchema);
export default NotificationModel;