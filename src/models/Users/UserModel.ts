/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export type UserType = {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	profilePic: { public_id: string; url: string };
	password: string;
	role: Record<string, any>;
	isActive: boolean;
	firstLogin: boolean;
	passToken: { value: string; used: boolean };
	activationToken: { value: string; used: boolean };
};

export type UserDocumentType = {
	[x: string]: any;
	hashPassword: (password: string) => Promise<any>;
	comparePassword: (password: string) => Promise<boolean>;
} & UserType &
	mongoose.Document;

export type UserModelType = {
	[x: string]: any;
	findByEmail: (email: string) => Promise<any>;
} & mongoose.Model<UserDocumentType>;

const UserSchema: mongoose.Schema<UserDocumentType> = new mongoose.Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		username: { type: String, default: `User${new Date().getTime()}` },
		email: { type: String, required: true, unique: true },
		profilePic: {
			type: {
				public_id: { type: String },
				url: { type: String }
			},
			default: {
				public_id: '',
				url: ''
			}
		},
		password: { type: String, required: true, minlength: 8, select: false },
		role: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'Role',
			required: true
		},
		isActive: {
			type: Boolean,
			default: false
		},
		firstLogin: { type: Boolean, default: true },
		passToken: {
			type: {
				value: String,
				used: Boolean,
				select: false
			},
			default: {
				value: '',
				used: true
			}
		},
		activationToken: {
			type: {
				value: String,
				used: Boolean,
				select: false
			},
			default: {
				value: '',
				used: true
			}
		}
	},
	{ timestamps: true }
);

UserSchema.methods.hashPassword = async function (password: string) {
	const salt = await bcrypt.genSalt(15);
	const hashed = await bcrypt.hash(password, salt);
	this.password = hashed;
	await this.save();
};
UserSchema.methods.comparePassword = async function (password: string) {
	const match = await bcrypt.compare(password, this.password);
	return match;
};
UserSchema.statics.findByEmail = async function (email: string) {
	const user = await UserModel.findOne({ email });
	return user;
};

const UserModel = mongoose.model<UserDocumentType, UserModelType>(
	'User',
	UserSchema
);
export default UserModel;
