import { environmentConfig } from '@ostrich-app-config';
import userRoles from '@ostrich-app/features/userRoles/models';
import workspaceRoles from '@ostrich-app/features/workspaceRoles/models';

class RoleMigrator {


	private migrateUserPermissions = () => {
		userRoles.getDefaultRole().then(async (res) => {
			if (res) {
				console.log('Default user role exists migrating updates-----------');
				userRoles.InsertRoles().then(() => {
					console.log('Roles migrated successfully-------------------');

				}).catch(err => {
					console.log(err);

				});
			}
			if (!res) {
				console.log('User roles do not exist creating------------------');
				console.log('User roles not migrated doing migrations----');
				userRoles.InsertRoles().then(() => {
					console.log('Roles migrated successfully----------------------');

				}).catch(err => {
					console.log(err);

				});
				console.log('User roles migration success------');

			}
		}
		).catch(err => {
			console.log(err);
		});

	};

	private migrateWorkspacePermissions = () => {
		workspaceRoles.getDefaultRole().then(async (res) => {
			if (res)
				console.log('Workspace default role exists migrating updates----------');

			if (!res) {
				console.log('Workspace roles do not exist creating-----------');
				console.log('User roles not migrated doing migrations----');
				workspaceRoles.InsertRoles().then(() => {
					console.log('Roles migrated successfully---------------------');

				}).catch(err => {
					console.log(err);

				});
				console.log('User roles migration success------');

			}
		}
		).catch(err => {
			console.log(err);
		});
	};

	migrate = async () => {
		console.log(`Current environment----${environmentConfig.NODE_ENV}`);

		this.migrateUserPermissions();
		this.migrateWorkspacePermissions();
	};


}

const roleMigrator = new RoleMigrator();
roleMigrator.migrate();
process.on('SIGTERM', () => {
	roleMigrator.migrate().finally(() => process.exit(0));
});

process.on('SIGINT', () => {
	roleMigrator.migrate().finally(() => process.exit(0));
});

process.on('exit', (code: number) => {
	console.log('APP stopped !', code);
});