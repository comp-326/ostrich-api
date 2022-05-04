/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from '@ostrich-db/mongodb';
import bcrypt from 'bcryptjs';

export type UserType = {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	avatar: string;
	password: string;
	role: Record<string, any>;
	isActive: boolean;
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
		avatar:String,
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
	},
	{ timestamps: true }
);

UserSchema.methods.hashPassword = async function (password: string){
	const salt = await bcrypt.genSalt(15);
	const hashed = await bcrypt.hash(password, salt);
	this.password = hashed;
	await this.save();
};
UserSchema.methods.comparePassword = async function (password: string){
	const match = await bcrypt.compare(password, this.password);
	return match;
};
UserSchema.statics.findByEmail = async function (email: string){
	const user = await UserModel.findOne({ email });
	return user;
};

const UserModel = mongoose.model<UserDocumentType, UserModelType>(
	'User',
	UserSchema
);
export default UserModel;
