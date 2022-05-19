<<<<<<< HEAD
import { environmentConfig } from '@ostrich-app-config';
=======
>>>>>>> 19227add749a048126a79c4f5addd72379b1e746
import userRoleModel from '@ostrich-app/features/userRoles/models';
import workspaceRoleModel from '@ostrich-app/features/workspaceRoles/models';

class RoleMigrator {


	private migrateUserPermissions = async () => {

		await userRoleModel.InsertRoles();

	};

	private migrateWorkspacePermissions = async () => {
		await workspaceRoleModel.InsertRoles();
	};

	migrate = async () => {
		await this.migrateUserPermissions();
		await this.migrateWorkspacePermissions();
<<<<<<< HEAD
		console.log(`Role migration successful----${environmentConfig.NODE_ENV}`);
=======
>>>>>>> 19227add749a048126a79c4f5addd72379b1e746
	};


}
(async () => {
	const roleMigrator = new RoleMigrator();
	await roleMigrator.migrate();
	setTimeout(() => {
		process.exit(0);
	}, 3000);
})();


