import { Schema, model } from "mongoose"
import { IBillingDocument, IBillingModel } from "./types"

const BillingSchema: Schema<IBillingDocument> = new Schema<IBillingDocument>(
    {
        price: { type: Number },
        title: { type: String },
        limits: { type: [String], default: [] },
        features: { type: [String], default: [] },
        description: { type: String }
    },
    { timestamps: true },
)
export const Billing = model<IBillingDocument, IBillingModel>(
    "Billing",
    BillingSchema,
)
