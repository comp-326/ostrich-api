import mongoose from '@ostrich-app-db/mongodb';

const tearDown = async () => {
	// afterAll(async () => {
	await mongoose.connection.dropDatabase();
	await mongoose.disconnect();
	// });
};

export default tearDown;
