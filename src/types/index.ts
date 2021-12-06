import { Document } from "mongoose"

type Mapper<T extends { [prop: string]: string }> = {
    [Key in keyof T]: T[Key]
}
type NodeConfTypes = {
    // [prop:string]:string
    production: 'production'
    development: 'development'
    testing: 'testing'
}

export type WorkspaceModelType = {
    owner: string
    customers: Array<string>
    _doc: any
} & Document

export type UserModelType = {
    username: string
    gender: "female" | "male" | "other"
    email: string
    isSuperAdmin: boolean
    isAdmin: boolean
    firstName: string
    middleName: string
    lastName: string
    workspace: WorkspaceModelType
    _doc: any
} & Document

export type NodeConfType = Mapper<NodeConfTypes>[keyof Mapper<NodeConfTypes>]