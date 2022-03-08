import { Schema, model, SchemaTypes } from "mongoose"
import { IMessageDocument, IMessageModel } from "./types"

const MessageSchema: Schema<IMessageDocument> = new Schema<IMessageDocument>(
    {
        body: { type: String, required: true },
        title: { type: String },
        author: { type: SchemaTypes.ObjectId, ref: "User" },
        workspace: { type: SchemaTypes.ObjectId, ref: "Workspace" },
    },
    { timestamps: true },
)
export const Message = model<IMessageDocument, IMessageModel>(
    "Message",
    MessageSchema,
)
