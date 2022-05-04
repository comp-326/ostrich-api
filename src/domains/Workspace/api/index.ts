import { makeQueryAllWorkspaceApiCall } from '@ostrich-app/domains/Workspace/api/get-workspaces';
import { makeQueryNewWorkspaceApiCall } from '@ostrich-app/domains/Workspace/api/new-workspace';
import { makeQueryUpdateLogoWorkspaceApiCall } from '@ostrich-app/domains/Workspace/api/update-logo';
import { makeQueryUpdateWorkspaceApiCall } from '@ostrich-app/domains/Workspace/api/update-workspace';
import { makeQueryUserWorkspaceApiCall } from '@ostrich-app/domains/Workspace/api/user-workspaces';

export default Object.freeze({
	makeQueryAllWorkspaceApiCall,
	makeQueryNewWorkspaceApiCall,
	makeQueryUpdateLogoWorkspaceApiCall,
	makeQueryUpdateWorkspaceApiCall,
	makeQueryUserWorkspaceApiCall,
});
