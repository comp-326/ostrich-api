import { Schema, model, SchemaTypes } from "mongoose"
import { IWorkspaceDocument, IWorkspaceModel } from "./types"

const WorkspaceSchema: Schema<IWorkspaceDocument> = new Schema(
    {
        logoUrl: {
            type: {
                public_id: String,
                url: String
            },
        },
        owner: { type: SchemaTypes.ObjectId, ref: "User", required: true },
        name: { type: String, required: true },
        type: { type: String, required: true },
        admins: { type: [SchemaTypes.ObjectId], default: [], ref: "User" },
        creators: { type: [SchemaTypes.ObjectId], default: [], ref: "User" },
        creator_lites: { type: [SchemaTypes.ObjectId], default: [], ref: "User" },
        members: { type: [SchemaTypes.ObjectId], default: [], ref: "User" },
        showBranding: { type: Boolean, default: true },
        folders: { type: [SchemaTypes.ObjectId], default: [], ref: "User" },
        services: { type: [SchemaTypes.ObjectId], default: [], ref: "Service" },
        messages: { type: [SchemaTypes.ObjectId], default: [], ref: "Message" },
        subscription: {
            billing: {

                type: SchemaTypes.ObjectId, ref: "Billing"
            }
            ,
            subscriptionType: { type: String, enum: ["annual", "monthly"], default: "monthly" },
            subscriptionDate: String,
            endDate: String
        },
        settings: {
            email: {
                firstVideoView: { type: Boolean },
                commentReplyVideo: { type: Boolean },
                emojiReaction: { type: Boolean },
            },
            desktopWeb: {
                firstVideoView: { type: Boolean },
                commentReplyVideo: { type: Boolean },
                emojiReaction: { type: Boolean },
            }
        },
        active: { type: Boolean },
    },
    { timestamps: true },
)
export const Workspace = model<IWorkspaceDocument, IWorkspaceModel>(
    "Workspace",
    WorkspaceSchema,
)
