import { IMediaDocument, IMediaDocumentModel } from '@ostrich-app/features/media/models/interfaces';
import mongoose from '@ostrich-app/db/mongodb';


const MediaSchema: mongoose.Schema<IMediaDocument> = new mongoose.Schema({
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


const MediaModel = mongoose.model<IMediaDocument, IMediaDocumentModel>('Media', MediaSchema);


export default MediaModel;