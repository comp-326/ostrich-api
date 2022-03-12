import mongoose from "mongoose"
import { IAvailabilityDocument, IAvailabilityModel } from "./types"

const AvailabilitySchema: mongoose.Schema<IAvailabilityDocument> =
	new mongoose.Schema(
		{
			user: {
				type: mongoose.SchemaTypes.ObjectId,
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
		},
		{ timestamps: true },
	)
export const Availability = mongoose.model<
	IAvailabilityDocument,
	IAvailabilityModel
>("Availability", AvailabilitySchema)
