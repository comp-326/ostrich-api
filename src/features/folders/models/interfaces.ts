import mongoose from '@ostrich-app-db/mongodb';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IFolder {
    workspace:any
    owner:any
    status:'active'|'inactive'
	name: string;
	isStandout: boolean;
	type: string;
	size: string;
	views: number;
	likes: number;
	address: {
		location: string;
		country: string;
		locationType: string;
	};
	media:any[]

}

export interface IFolderDocument extends mongoose.Document{
    _doc:any
}

export interface IFolderDocumentModel extends mongoose.Model<IFolderDocument>{
    getByName:(name:string)=>Promise<any>
}