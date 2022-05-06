/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from '@ostrich-app/db/mongodb';

const CommentSchema:mongoose.Schema<any>=new mongoose.Schema({
	name:String
});

const CommentsModel = mongoose.model<any>('Comments',CommentSchema);

export default CommentsModel;