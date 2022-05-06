/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUserDocument, IUserDocumentModel } from '@ostrich-app/features/users/models/interfaces';
import mongoose from '@ostrich-app/db/mongodb';

const UserSchema: mongoose.Schema<IUserDocument> = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		trim: true
	},
	lastName: {
		type: String,
		trim: true,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		index: true,
		trim: true
	},
	bio: {
		type: String,
		default: '',
		trim: true
	},
	password: {
		type: String,
		minlength: 8,
		required: true,
		select: false
	},
	isActive: {
		type: Boolean,
		default: false,

	},
	gender: {
		type: String,
		enum: ['male', 'female', 'other', 'rather not say'],
		default: 'rather not say',
	},
	isDeleted: {
		type: Boolean,
		default: false,
		select: false
	},
	role: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true,
		ref: 'UserRoles'
	},
	profilePicture: {
		type: mongoose.SchemaTypes.ObjectId,
		required: false,
		ref: 'Media',
		default: ''
	}

});

const UserModel = mongoose.model<IUserDocument, IUserDocumentModel>('Users', UserSchema);

export default UserModel;