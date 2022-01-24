import { model, Schema, SchemaTypes } from "mongoose"
import { UserModelType } from "./types"
import bcrypt from "bcryptjs"

const UserSchema = new Schema<UserModelType>(
	{
		email: {
			type: String,
			required: [true, "Email field is required"],
			index: true,
			unique: true,
		},
		username: {
			type: String,
			required: false,
			unique: true,
			index:true
		},
		firstName: {
			type: String,
			required: [true, "First name is required"],
		},
		lastName: {
			type: String,
			required: [true, "Last name field is required"],
		},
		password: {
			type: String,
			required: [true, "Password cannot be empty"],
			minlength: 8,
			select: false,
		},
		referrals: {
			type: [
				{
					type: SchemaTypes.ObjectId,
					required: [true, "Referral Id required"],
				},
			],
			default: [],
		},
		accountType: {
			type: String,
			default: "basic",
		},
		address: {
			street: {
				type: String,
			},
			postalCode: {
				type: String,
			},
			city: { type: String },
			country: { type: String },
			zip: { type: String },
		},
		isActive: {
			type: Boolean,
			default: false,
		},
		gender: {
			type: String,
		},
		middleName: {
			type: String,
			required: false,
		},
		profilePic: { type: String, default: "" },
		role: {
			type: String,
			default: "user",
			lowercase: true,
		},
		activationDate: {
			type: SchemaTypes.Date,
		},
		likedInstitutions: {
			type: [{ type: SchemaTypes.ObjectId, ref: "Institution" }],
			default: [],
		},
		ActivationToken: {
			value: { type: String },
			isUsed: { type: Boolean },
			select: false,
		},
		PasswordToken: {
			value: { type: String },
			isUsed: { type: Boolean },
			select: false,
		},
		availability: {
			type: SchemaTypes.ObjectId,
			ref: "Availability",
		},
	},
	{ timestamps: true },
)

UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		return next()
	}
	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
	return next()
})

UserSchema.methods.passwordMatch = async function (password: string) {
	return await bcrypt.compare(password, this.password)
}

export default model<UserModelType>("User", UserSchema)
