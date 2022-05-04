/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from '@ostrich-app/db/mongodb';
export type FolderType = {
	workspace: Record<string, any>;
	name: string;
	isStandout: boolean;
	type: string;
	size: string;
	views: number;
	likes: number;
	address: {
		location: string;
		country: string;
		loactionType: string;
	};
	images: { public_id: string; url: string }[];

	finance: {
		tuitionFeeUnderGraduate: number;
		tuitionFeePostGraduate: number;
		tuitionFeePostDeposit: number;
		tuitionPricingCategory: string;
		currency: string;
		scholarshipAverage: string;
		scholarshipChances: string;
		internationalFeeDiferential: number;
	};
	prompts: Record<string, any>[];
	comments: Record<string, any>[];
	_doc: any;
};

export type FolderDocumentType = {
	[x: string]: any;
} & FolderType &
	mongoose.Document;

export type FolderModelType = {
	[x: string]: any;
} & mongoose.Model<FolderDocumentType>;

const FolderSchema: mongoose.Schema<FolderDocumentType> = new mongoose.Schema(
	{
		workspace: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'Workspace'
		},
		name: { type: String },
		isStandout: { type: Boolean },
		type: { type: String },
		size: { type: String },
		views: { type: Number },
		likes: { type: Number },
		address: {
			location: { type: String },
			country: { type: String },
			loactionType: { type: String }
		},
		images: {
			type: [{ public_id: String, url: String }],
			default: []
		},

		finance: {
			tuitionFeeUnderGraduate: { type: Number },
			tuitionFeePostGraduate: { type: Number },
			tuitionFeePostDeposit: { type: Number },
			tuitionPricingCategory: { type: String },
			currency: { type: String },
			scholarshipAverage: { type: String },
			scholarshipChances: { type: String },
			internationalFeeDiferential: { type: Number }
		},
		prompts: { type: [String], default: [] },
		comments: { type: [String], default: [] }
	},
	{ timestamps: true }
);

const FolderModel = mongoose.model<FolderDocumentType, FolderModelType>(
	'Folder',
	FolderSchema
);
export default FolderModel;
