import { Schema, model, SchemaTypes } from "mongoose"
import { IFolderDocument, IFolderModel } from "./types"

const FolderSchema: Schema<IFolderDocument> = new Schema(
	{
		title: { type: String },
		image1Url: { type: { url: String, public_id: String } },
		image2Url: { type: { url: String, public_id: String } },
		image3Url: { type: { url: String, public_id: String } },
		image4Url: { type: { url: String, public_id: String } },
		image5Url: { type: { url: String, public_id: String } },
		image6Url: { type: { url: String, public_id: String } },
		description: { type: String },
		videoUrl: { type: { url: String, public_id: String } },
		isStandout: { type: Boolean, default: false },
		audioUrl: { type: { url: String, public_id: String } },
		comments: { type: [SchemaTypes.ObjectId], default: [], ref: "Comment" },
		likes: { type: Number, min: 0, default: 0 },
		shares: { type: Number, default: 0 },
		owner: { type: SchemaTypes.ObjectId, ref: "User" },
		logo: { type: { url: String, public_id: String } },
		size: { type: Number },
		type: { type: String },
		country: { type: String },
		locationType: { type: String },
		population: { type: Number },
		views: { type: Number },
		location: {
			latitude: { type: Number },
			longitude: { type: String },
			city: { type: String },
		},
		prompts: {
			type: [
				{
					type: { type: String },
					data: { type: SchemaTypes.Mixed },
				},
			],
		},
		finances: {
			tuitionFeeUnderGraduate: { type: Number, min: 0, default: 0 },
			tuitionFeeGraduate: { type: Number, min: 0, default: 0 },
			tuitionFeePostGraduate: { type: Number, min: 0, default: 0 },
			scholarshipAverage: { type: Number, min: 0, default: 0 },
			scholarshipChances: { type: Number, min: 0, default: 0 },
			internationalFeeDifferential: { type: Number, min: 0, default: 0 },
			tuitionFeDeposit: { type: Number, min: 0, default: 0 },
			tuitionPricingCategory: { type: String },
		},
	},
	{ timestamps: true },
)
export const Folder = model<IFolderDocument, IFolderModel>(
	"Folder",
	FolderSchema,
)
