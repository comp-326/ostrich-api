import { connect } from 'mongoose'

export default async function (configuration: { databaseUrl: string }) {
	connect(configuration.databaseUrl)
		.then(() => {
			console.log('Database connection succesful')
		})
		.catch(err => {
			console.log(err.message)
		})
}
