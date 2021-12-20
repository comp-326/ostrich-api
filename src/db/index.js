const { connect } = require('mongoose')

/**
 *
 * @param {string} databaseUrl
 */
const connectToDatabase = async databaseUrl => {
	await connect(databaseUrl, {}, err => {
		if (err) {
			console.log(err.message)
		} else {
			console.log('Database connection successful')
		}
	})
}

module.exports = { connectToDatabase }
