/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from '@ostrich-app-db/mongodb';

export interface IWorkspaceRole {
    name: string;
    permissions: number;
    default: boolean;
}

export interface IWorkspaceRoleDocument extends IWorkspaceRole, mongoose.Document {
    _doc: any
    resetPermission: () => void;
    addPermission: (permission: number) => void;
    removePermission: (permission: number) => void;
    hasPermission: (permission: number) => boolean;
}

export interface IWorkspaceRoleDocumentModel extends mongoose.Model<IWorkspaceRoleDocument> {
    insertRoles: () => void;
    getDefaultRole: () => Promise<any>;
    InsertRoles: () => Promise<any>;
}  