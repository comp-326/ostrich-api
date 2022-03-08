/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Schema, model, SchemaTypes } from "mongoose"
import bcrypt from "bcryptjs"
import { IUserDocument, IUserModel } from "./types"

const UserSchema: Schema<IUserDocument> = new Schema(
	{
		username: { type: String, default: `user-${new Date().getTime()}`, unique: true },
		firstName: { type: String, required: [true, "First name required"] },
		lastName: { type: String, required: [true, "Last name required"] },
		middleName: { type: String, default: "" },
		gender: { type: String, enum: ["male", "female", "other"] },
		accountType: { type: String },
		password: { type: String, required: true, minlength: 8, select: false },
		role: { type: SchemaTypes.ObjectId, ref: "Role", required: true },
		email: { type: String },
		firstTimeSignOn: { type: Boolean, default: true },
		profilePic: {
			public_id: { type: String, default: "", url: { type: String, default: "" } }
		},
		isActive: { type: Boolean, default: false },
		status: { type: String, enum: ["invited", "pending", "active"] },
		activationDate: { type: String },
		availability: {
			type: [SchemaTypes.ObjectId],
			default: [],
			ref: "Availability"
		},
		userType: {
			type: String,
		},
		dateOfBirth: { type: String },
		phoneNumber: { type: String },
		modeOfCommunication: { type: [String], enum: ["sms", "email"], default: [] },
		note: { type: String, default: String },
		address: {
			type: {
				city: { type: String },
				street: { type: String },
				postalCode: { type: String },
				country: { type: String },
				zip: { type: String },
			},
		},
		likedFolders: {
			type: [SchemaTypes.ObjectId],
			ref: "Folder",
			default: []
		},
		referrals: {
			type: [SchemaTypes.ObjectId],
			ref: "User",
			default: []
		},
		ActivationToken: {

			value: { type: String },
			isUsed: { type: Boolean },
			select: false
		},
		PasswordToken: {
			value: String,
			isUsed: Boolean,
			select: false

		}
	},
	{ timestamps: true },
)

UserSchema.virtual("fullName").get(function (this: IUserDocument) {
	return `${this.firstName} ${this.lastName}`
})
UserSchema.methods.hashPassword = async function (
	password: string,
): Promise<void> {
	const salt = await bcrypt.genSalt(10)
	const passwordHash = await bcrypt.hash(password, salt)
	this.password = passwordHash
	await this.save()
}
UserSchema.methods.comparePassword = async function (
	password: string,
): Promise<boolean> {
	const match = await bcrypt.compare(password, this.password)
	return match
}
UserSchema.statics.findByEmail = async function (email: string) {
	const document = await this.findOne({ email })
	return document
}

export const User = model<IUserDocument, IUserModel>("User", UserSchema)
