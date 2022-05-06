/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from '@ostrich-app/db/mongodb';

export interface IWorkspaceInvite {
    inviteRole: string;
    status: 'pending' | 'confirmed',
    workspaceOwnerId: string,
    workspaceOwnerEmail: string
    inviteeEmail: string
    note: string
}

export interface IWorkspaceInviteDocument extends IWorkspaceInvite, mongoose.Document {
    _doc: any
}

export interface IWorkspaceInviteDocumentModel extends mongoose.Model<IWorkspaceInviteDocument> {
    getPendingInvites: (workspaceId: string) => Promise<IWorkspaceInviteDocument[] | null>;
    getConfirmedInvites: () => Promise<IWorkspaceInviteDocument[] | null>;
}  