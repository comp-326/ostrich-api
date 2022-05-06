/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from '@ostrich-app/db/mongodb';


const ServiceSchema:mongoose.Schema<any>=new mongoose.Schema({
	name:String
});

const ServicesModel = mongoose.model<any>('Services',ServiceSchema);

export default ServicesModel;