/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose"

type Todo = {
	title: string
	body: string
	author: string
	done: boolean
	scheduledDate: Date
	_doc: any
}

type TodoDocumentType = {
	[x: string]: any
} & Todo &
	Document

type TodoModelType = {
	[x: string]: any
	findByTitle: (title: string) => Promise<any>
} & mongoose.Model<TodoDocumentType>

const TodoSchema: mongoose.Schema<TodoDocumentType> = new mongoose.Schema({
	title: { type: String, reqired: true },
	body: { type: String, required: true },
	scheduledDate: { type: Date },
	done: { type: Boolean, default: false },
	author: { type: String, required: true },
},{timestamps:true})

TodoSchema.statics.findByTitle = async (title: string) => {
	const todo = await TodoModel.findOne({ title })
	return todo
}

const TodoModel = mongoose.model<TodoDocumentType, TodoModelType>(
	"Todo",
	TodoSchema,
)

export default TodoModel
