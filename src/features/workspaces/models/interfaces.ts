/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from '@ostrich-app-db/mongodb';

export interface IWorkspace {
    name: string
    ownerId: any
    logo: any,
	type:'personal'|'business'|'education'
}

export interface IWorkspaceDocument extends IWorkspace, mongoose.Document {
    _id: any
}

export interface IWorkspaceDocumentModel extends mongoose.Model<IWorkspaceDocument> {
    findByName: (name: string) => Promise<any>
    findWorkspaceById: (id: string) => Promise<any>
}

