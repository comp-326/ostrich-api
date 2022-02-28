import { model, Schema, SchemaTypes } from "mongoose"
import { UserAvailabilityType } from "./types"

const AvailabilitySchema = new Schema<UserAvailabilityType>(
	{
		user: {
			type: SchemaTypes.ObjectId,
			required: true,
			ref: "User",
		},
		days: {
			type: [
				{
					position: { type: Number },
					day: { type: String },
					value: { type: String },
					initial: { type: String },
				},
			],
		},
		startTime: { type: String },
		endTime: { type: String },
	},
	{ timestamps: true },
)

export default model<UserAvailabilityType>("Availability", AvailabilitySchema)
