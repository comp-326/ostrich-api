/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from '@ostrich-app/db/mongodb';


const serviceSchema:mongoose.Schema<any>=new mongoose.Schema({
	name:String
});

const servicesModel = mongoose.model<any>('Services',serviceSchema);

export default servicesModel;