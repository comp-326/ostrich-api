import { model, SchemaTypes, Schema } from "mongoose"
import { InstitutionModelType } from "./types"

const InstitutionShema = new Schema<InstitutionModelType>(
	{
		author: {
			type: SchemaTypes.ObjectId,
			ref: "User",
		},
		description: {
			type: String,
			default: "",
		},
		comments: {
			type: [
				{
					author: {
						type: SchemaTypes.ObjectId,
						ref: "User",
					},
					comment: {
						type: String,
						default: "",
					},
				},
			],
			default: [],
		},
		images: {
			type: [String],
			default: [],
		},
		likes: {
			type: Number,
			min: 0,
		},
		location: {
			type: {
				longitude: { type: String, default: "" },
				latitude: { type: String, default: "" },
				city: { type: String, default: "" },
			},
		},
		population: {
			type: Number,
			min: 0,
		},
		name: {
			type: String,
			unique: true,
			index: true,
			required: [true, "Institution name required"],
		},
		logo: {
			type: String,
			default: "",
		},
		size: {
			type: String,
			min: 0,
		},
		image1Url: {
			type: String,
			default: "",
		},
		image2Url: {
			type: String,
			default: "",
		},
		image3Url: {
			type: String,
			default: "",
		},
		image4Url: {
			type: String,
			default: "",
		},
		image5Url: {
			type: String,
			default: "",
		},
		image6Url: {
			type: String,
			default: "",
		},
	},
	{ timestamps: true },
)

export default model("Institution", InstitutionShema)
