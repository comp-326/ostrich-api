import { Schema, model, SchemaTypes } from "mongoose"
import { IIntakeDocument, IIntakeModel } from "./types"

const IntakeSchema: Schema<IIntakeDocument> = new Schema(
	{
		alias: { type: String, default: "" },
		firstName: { type: String, default: "" },
		lastName: { type: String, default: "" },
		middleName: { type: String, default: "" },
		gender: { type: String, default: "" },
		accountType: { type: String, default: "" },
		email: { type: String, default: "" },
		dateOfBirth: { type: String, default: "" },
		phoneNumber: { type: String, default: "" },
		modeOfCommunication: { type: String, enum: ["sms", "email"] },
		note: { type: String, default: "" },
		address: {
			city: { type: String, default: "" },
			street: { type: String, default: "" },
			postalCode: { type: String, default: "" },
			country: { type: String, default: "" },
			zip: { type: String, default: "" },
		},
		logs: {
			type: [
				{
					title: { type: String },
					time: { type: String },
				},
			],
			default: [],
		},
		assignedServices: {
			type: [
				{
					status: { type: String },
					tags: { type: [String], default: [] },
					service: {
						type: {
							category: { type: String },
							feeRate: { type: String },
							balance: { type: String },
							dueBy: { type: String },
							address: { type: String },
							city: { type: String },
							province: { type: String },
							country: { type: String },
							preferredServiceCode: { type: String },
							tags: { type: [String] },
							processing: {
								type: {
									group: { type: String },
									delegateTo: { type: String },
									delegate: { type: Boolean },
									memberEmail: { type: String },
									memberFee: { type: Number },
									providerFirstName: { type: String },
									providerLastName: { type: String },
									providerEmail: { type: String },
									providerPhone: { type: String },
								},
							},
							status: {
								type: {
									intakeId: { type: SchemaTypes.ObjectId },
									intakeType: { type: String },
									intakeStatus: { type: String, default: "" },
									eventId: { type: String, default: "" },
									tag: { type: String, default: "" },
									paymentStatus: { type: String },
									totalPaid: { type: String },
								},
							},
						},
					},
				},
			],
		},
	},
	{ timestamps: true },
)
export const Intake = model<IIntakeDocument, IIntakeModel>(
	"Intake",
	IntakeSchema,
)
