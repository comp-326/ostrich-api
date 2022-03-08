import { Schema, model, SchemaTypes } from "mongoose"
import { ICommentDocument, ICommentModel } from "./types"

const CommentSchema: Schema<ICommentDocument> = new Schema(
	{
		author: {
			type: SchemaTypes.ObjectId,
			ref: "User",
			required: [true, "User id required"],
		},
		body: {
			type: String,
			required: [true, "Comment body required"],
		},
		
	},
	{ timestamps: true },
)

CommentSchema.statics.findByName = async function (name: string) {
	const document = await this.findOne({ name })
	return document
}
export const Comment = model<ICommentDocument, ICommentModel>(
	"Comment",
	CommentSchema,
)
