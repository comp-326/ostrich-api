import mongoose from "mongoose"
/**
 * ******************  ROLE **********************
 */
export type IRole = {
    name: string
    permissions: number
    default: boolean
}

export type IRoleDocument = {
    [x: string]: any
    resetPermission: () => void
    addPermission: (permission: number) => void
    removePermission: (permission: number) => void
    hasPermission: (permission: number) => boolean
} & IRole & mongoose.Document

export type IRoleModel = {
    insertRoles: () => void
    getDefaultRole: () => Promise<IRoleDocument>
} & mongoose.Model<IRoleDocument> 
