/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from '@ostrich-app/db/mongodb';

const FolderSchema:mongoose.Schema<any>=new mongoose.Schema({
	name:String
});

const FolderModel = mongoose.model<any>('Folder',FolderSchema);

export default FolderModel;