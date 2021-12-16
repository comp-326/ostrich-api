import { DATABASE_URL } from './../config'

import mongoose, { Mongoose } from 'mongoose'
import { MongoError } from 'mongodb'

function callback(err?: MongoError) {
	if (err) {
		console.log(err.message)
	} else {
		console.log('Succesfully Connected!')
	}
}

function connectDatabase(): Promise<Mongoose> {
	// const mongoUrl = 'localhost'

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	return mongoose.connect(DATABASE_URL!, {})
}

export { connectDatabase, callback }
