import mongoose from '@ostrich-app-db/mongodb';
import { IMediaDocument, IMediaDocumentModel } from './interfaces';


const mediaSchema: mongoose.Schema<IMediaDocument> = new mongoose.Schema({
	mediaType: {
		type: String,
		enum: ['image', 'video', 'audio'],
		required: true
	},
	size: {
		type: Number,
		min: 0,
		required: true
	},
	type: {
		type: String,
		enum: ['logo', 'media', 'profile'],
		required: true
	},
	uploadId: {
		type: String,
		required: true
	},
	url: {
		type: String,
		required: true
	}
}, {
	timestamps: true
});


const mediaModel = mongoose.model<IMediaDocument, IMediaDocumentModel>('Media', mediaSchema);


export default mediaModel;