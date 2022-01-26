import { model, Schema, SchemaTypes } from "mongoose"
import { UserAvailabilityType } from "./types"

const AvailabilitySchema = new Schema<UserAvailabilityType>({
	user: {
		type: SchemaTypes.ObjectId,
		ref: "User",
		required: [true, "You must be a valid user"],
	},
	availability: {
		type: {
			days: [
				{
					position: {
						type: Number,
					},
					initial: {
						type: String,
					},
					value: {
						type: String,
					},
					day: { type: String, uppercase: true },
				},
			],
			startTime: {
				type: String,
			},
			endTime: { type: String },
		},
	},
})

export default model<UserAvailabilityType>("Availability", AvailabilitySchema)
