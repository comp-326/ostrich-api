/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from '@ostrich-app-db/mongodb';

const commentSchema:mongoose.Schema<any>=new mongoose.Schema({
	name:String
});

const commentsModel = mongoose.model<any>('Comments',commentSchema);

export default commentsModel;