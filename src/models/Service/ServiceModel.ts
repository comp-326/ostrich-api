/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import '@root/db';
export type ServiceType = {
	category: string;
	feeRate: number | string;
	tags: string[];
	crmTags: [];
	providerFirstName: string;
	providerLastName: string;
	providerEmail: string;
	providerPhone: string;
	group: string;
	cost: string;
	_doc: any;
};

export type ServiceDocumentType = {
	[x: string]: any;
} & ServiceType &
	mongoose.Document;

export type ServiceModelType = {
	findByName: (name: string) => Promise<ServiceDocumentType>;
} & mongoose.Model<ServiceDocumentType>;

const ServiceSchema = new mongoose.Schema(
	{
		workspace: { type: mongoose.SchemaTypes.ObjectId },
		category: { type: String },
		feeRate: { type: String },
		tags: { type: [String] },
		crmTags: { type: [String] },
		providerFirstName: { type: String },
		providerLastName: { type: String },
		providerEmail: { type: String },
		providerPhone: { type: String },
		group: { type: String },
		cost: { type: Number }
	},
	{ timestamps: true }
);

const ServiceModel = mongoose.model<ServiceDocumentType, ServiceModelType>(
	'Service',
	ServiceSchema
);
export default ServiceModel;
