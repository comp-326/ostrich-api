import mongoose from "mongoose"
/**
 * ************ INTAKE *****************
 */

export type IIntake = {
    alias: string
    firstName: string
    lastName: string
    middleName: string
    gender: string
    accountType: string
    email: string
    middleName: string
    dateOfBirth: Date | string
    phoneNumber: string
    modeOfCommunication: "sms" | "email"
    note: string
    address: {
        city: string
        street: string
        postalCode: string
        country: string
        zip: string
    }
    logs: { title: string, time: String, }[]
    assignedServices: {
        status: any
        tags: string[]
        service: IUserService
    }[]
}
export type IUserService = {
    category: string
    feeRate: number
    balance: string
    dueBy: string
    address: string
    city: string
    province: string
    country: string
    preferredServiceCode: string
    tags: string[]
    processing: IUserServiceProcessing

    status: UserServiceStatusI
}
export type IUserServiceProcessing = {
    group: string
    delegateTo: string
    delegate: boolean
    memberEmail: string
    memberFee: number
    providerFirstName: any
    providerLastName: any
    providerEmail: any
    providerPhone: any
}
export type UserServiceStatusI = {
    intakeId: string
    intakeType: string
    intakeStatus: string
    eventId: string
    tag: string
    paymentStatus: string
    totalPaid: string
}
export type IIntakeDocument = {
    [x: string]: any
} & IIntake & mongoose.Document

export type IIntakeModel = {
    findByName: (name: string) => Promise<IIntakeDocument>
} & mongoose.Model<IIntakeDocument>
