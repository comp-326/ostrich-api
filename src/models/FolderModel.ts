/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose"

export type FolderType = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	owner: Record<string, any>
	name: string
	image1: { public_id: string; url: string }
	image2: { public_id: string; url: string }
	image3: { public_id: string; url: string }
	image4: { public_id: string; url: string }
	image5: { public_id: string; url: string }
	image6: { public_id: string; url: string }
	isStandout: boolean
	type: string
	location: string
	country: string
	loactionType: string
	size: string
	views: number
	tuitionFeeUnderGraduate: number
	tuitionFeePostGraduate: number
	tuitionFeePostDeposit: number
	tuitionPricingCategory: string
	currency: string
	scholarshipAverage: string
	scholarshipChances: string
	internationalFeeDiferential: number
	prompts: Record<any, any>
	comments: Record<string, any>[]
	likes: number
	_doc: any
}

export type FolderDocumentType = {
	[x: string]: any
} & FolderType &
	mongoose.Document

export type FolderModelType = {
	[x: string]: any
} & mongoose.Model<FolderDocumentType>

const FolderSchema: mongoose.Schema<FolderDocumentType> = new mongoose.Schema(
	{
		owner: {
			type: mongoose.SchemaTypes.ObjectId,
			required: true,
			ref: "User",
		},
		name: {
			type: String,
			default: "untitled_folder",
		},
		image1: {
			type: { public_id: String, url: String },
			default: { public_id: "", url: "" },
		},
		image2: {
			type: { public_id: String, url: String },
			default: { public_id: "", url: "" },
		},
		image3: {
			type: { public_id: String, url: String },
			default: { public_id: "", url: "" },
		},
		image4: {
			type: { public_id: String, url: String },
			default: { public_id: "", url: "" },
		},
		image5: {
			type: { public_id: String, url: String },
			default: { public_id: "", url: "" },
		},
		image6: {
			type: { public_id: String, url: String },
			default: { public_id: "", url: "" },
		},
		isStandout: { type: Boolean, default: false },
		type: { type: String, default: "" },
		location: { type: String, default: "" },
		country: { type: String, default: "" },
		loactionType: { type: String, default: "" },
		size: { type: String, default: "" },
		views: { type: Number, default: 0, min: 0 },
		tuitionFeeUnderGraduate: { type: Number, min: 0, default: 0 },
		tuitionFeePostGraduate: { type: Number, min: 0, default: 0 },
		tuitionFeePostDeposit: { type: Number, min: 0, default: 0 },
		tuitionPricingCategory: {
			type: String,
			default: "medium",
			enum: ["low", "medium", "high"],
		},
		currency: { type: String, default: "usd" },
		scholarshipAverage: { type: Number, default: 0, min: 0 },
		scholarshipChances: { type: String, default: "" },
		internationalFeeDiferential: { type: Number, default: 0 },
		prompts: { type: [mongoose.SchemaTypes.Mixed], default: [] },
		comments: {
			type: [mongoose.SchemaTypes.ObjectId],
			ref: "Comment",
			default: [],
		},
		likes: { type: Number, default: 0, min: 0 },
	},
	{ timestamps: true },
)

const FolderModel = mongoose.model<FolderDocumentType, FolderModelType>(
	"Folder",
	FolderSchema,
)
export default FolderModel
