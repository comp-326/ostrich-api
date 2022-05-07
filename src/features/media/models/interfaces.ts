/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from '@ostrich-app-db/mongodb';


export interface IMedia {
    mediaType: 'image' | 'video' | 'audio',
    size: number,
    url: string
    uploadId: string
    type: 'logo' | 'media' | 'profile',
}

export interface IMediaDocument extends IMedia, mongoose.Document {
    _doc: any
}

export interface IMediaDocumentModel extends mongoose.Model<IMediaDocument> {
    findLogo: (id: string) => Promise<IMediaDocument>
    findMedia: (id: string) => Promise<IMediaDocument>
    findProfilePic: (id: string) => Promise<IMediaDocument>
}
