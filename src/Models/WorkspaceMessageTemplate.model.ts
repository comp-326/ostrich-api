import { model, Schema, SchemaTypes } from "mongoose"
import { WorkspaceMessageType } from "./types"

const MessageTemplateSchema = new Schema<WorkspaceMessageType>({
	title: {
		type: String,
		required: [true, "Please provide message title"],
		author: { type: SchemaTypes.ObjectId, ref: "User" },
		workspace: { type: SchemaTypes.ObjectId, ref: "Workspace" },
		template: { type: String },
	},
})

export default model("WorkspaceMessage", MessageTemplateSchema)
