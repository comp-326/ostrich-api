import { Schema, model, SchemaTypes } from "mongoose"
import { IServiceDocument, IServiceModel } from "./types"

const ServiceSchema: Schema<IServiceDocument> = new Schema(
    {
        workspace:{type:SchemaTypes.ObjectId},
        category: {type:String},
        feeRate: {type:String},
        tags: {type:[String]},
        crmTags: {type:[String]},
        providerFirstName: {type:String},
        providerLastName: {type:String},
        providerEmail: {type:String},
        providerPhone: {type:String},
        group: {type:String},
        cost: {type:Number},
    },
    { timestamps: true },
)
export const Service = model<IServiceDocument, IServiceModel>(
    "Service",
    ServiceSchema,
)
