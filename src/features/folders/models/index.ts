/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from '@ostrich-app/db/mongodb';

const folderSchema:mongoose.Schema<any>=new mongoose.Schema({
	name:String
});

const folderModel = mongoose.model<any>('Folder',folderSchema);

export default folderModel;