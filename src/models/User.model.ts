import { model, Schema } from 'mongoose'
import { UserModelType } from './@types/UserModelType'

const UserSchema = new Schema<UserModelType>({
	username: {
		type: String,
		trim: true,
		default: '',
	},
	firstName: {
		type: String,
		trim: true,
		required: true,
	},
	lastName: {
		type: String,
		unique: true,
		trim: true,
		required: true,
	},
	active: {
		type: Boolean,
		default: false,
		index: true,
	},
	email: {
		type: String,
		unique: true,
		trim: true,
		index: true,
		required: true,
	},
	password: {
		type: String,
		unique: true,
		trim: true,
		required: true,
		min: 8,
	},
	accountType: {
		type: String,
		default: 'basic',
		lowercase: true,
		trim: true,
	},
	role: {
		type: String,
		default: 'user',
		lowercase: true,
	},
	phone: {
		type: String,
		default: '',
	},
	modeOfCommunication: {
		type: String,
		default: 'email',
		lowercase: true,
	},
	address: {
		country: {
			type: String,
			default: '',
		},
	},
})

export default model<UserModelType>('User', UserSchema)
