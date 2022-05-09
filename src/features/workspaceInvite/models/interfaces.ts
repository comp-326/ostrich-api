/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from '@ostrich-app-db/mongodb';

export interface IWorkspaceInvite {
    inviteRole: any;
    status: 'pending' | 'confirmed',
    workspaceId: any,
    workspaceOwnerEmail: string
    inviteeEmail: string
    note: string,
    inviteeId: any
}

export interface IWorkspaceInviteDocument extends IWorkspaceInvite, mongoose.Document {
    _doc: any
    // consfirmInvite
}

export interface IWorkspaceInviteDocumentModel extends mongoose.Model<IWorkspaceInviteDocument> {
    getPendingInvites: (workspaceId: string) => Promise<IWorkspaceInviteDocument[] | null>;
    getConfirmedInvites: () => Promise<IWorkspaceInviteDocument[] | null>;
}  