import mongoose from 'mongoose';
import { DB_URL } from '../config';

const options = {
	autoIndex: true, // Don't build indexes
	maxPoolSize: 10, // Maintain up to 10 socket connections
	serverSelectionTimeoutMS: 10000, // Keep trying to send operations for 10 seconds
	socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
	family: 4 // Use IPv4, skip trying IPv6
};

const connection = async (DB_URL: string) => {
	try {
		await mongoose.connect(DB_URL, options);
	} catch (error) {
		console.error(`Could not connect to db: Reason -> ${error.message}`);
	}
};

export default connection(DB_URL);
