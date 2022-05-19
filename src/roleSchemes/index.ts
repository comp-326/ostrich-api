import { environmentConfig } from '@ostrich-app-config';
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

		console.log(`Role migration successful----${environmentConfig.NODE_ENV}`);

	};


}
(async () => {
	const roleMigrator = new RoleMigrator();
	await roleMigrator.migrate();
	setTimeout(() => {
		process.exit(0);
	}, 3000);
})();


