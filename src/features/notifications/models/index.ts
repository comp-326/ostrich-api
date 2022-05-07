/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from '@ostrich-app/db/mongodb';

const notificationSchema: mongoose.Schema<any> = new mongoose.Schema({
	name: String
});

const notificationModel = mongoose.model<any>('Notification', notificationSchema);
export default notificationModel;