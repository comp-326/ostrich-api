/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from '@ostrich-app-db/mongodb';

export interface IWorkspaceMember {
    memberRole: any;
    workspaceId: string,
    memberEmail: string,
    memberPhone: string,
    memberId: string,
}

export interface IWorkspaceMemberDocument extends IWorkspaceMember, mongoose.Document {
    _doc: any
}

export interface IWorkspaceMemberDocumentModel extends mongoose.Model<IWorkspaceMemberDocument> {
    getWorkspaceAdmins: (workspaceId: string) => Promise<IWorkspaceMemberDocument[] | null>;
    getWorkpaceCreators: (workspaceId:string) => Promise<IWorkspaceMemberDocument[] | null>;
    getWorkpaceCreatorLites: (workspaceId:string) => Promise<IWorkspaceMemberDocument[] | null>;
    getWorkpaceCustom: (workspaceId:string,role:string) => Promise<IWorkspaceMemberDocument[] | null>;
}  