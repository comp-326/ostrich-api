import mongoose from "mongoose"
/**
 * ************ BILLING *****************
 */

export type IBilling = {
    price: number
    title: string
    limits: string[]
    features: string[]
    description: string
    _doc: any
}

export type IBillingDocument = {
    [x: string]: any
} & IBilling & mongoose.Document

export type IBillingModel = {
    findByName: (name: string) => Promise<IIBillingDocument>
} & mongoose.Model<IBillingDocument>