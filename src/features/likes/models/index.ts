/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from '@ostrich-app-db/mongodb';


const likesSchema:mongoose.Schema<any>=new mongoose.Schema({
	name:String
});

export default mongoose.model<any>('Likes',likesSchema);