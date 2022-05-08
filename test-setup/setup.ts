import { mongoConfig } from '@ostrich-app-config';
import mongoose from '@ostrich-app-db/mongodb';
import userRoleModel from '@ostrich-app/features/userRoles/models';
const setup = async () => {
	// beforeAll(async () => {
	await mongoose.connect(mongoConfig.TEST_DB_URL, {});
	await userRoleModel.InsertRoles();
	// });
};

export default setup;
