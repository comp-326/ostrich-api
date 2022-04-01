/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ITodo {
	title: string
	body: string
	author: string
	done: boolean
	scheduledDate: Date
}

export interface ITodoRequest {
	params: any
	body: any
	query: any
	headers: any
	files?: any
	file?: any
}

export interface ITodoRepository {
	createTodo: (data: ITodo) => Promise<any>
	findByTitle: (title: string) => Promise<any>
	findById: (id: string) => Promise<any>
	find: (limit: number, page: number) => Promise<any>
	updateById: (id: string, data: ITodo) => Promise<any>
	deleteById: (id: string) => Promise<any>
}
