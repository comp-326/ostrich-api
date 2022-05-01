import { makeQueryAllWorkspaceApiCall } from '@ostrich-domains/Workspace/api/get-workspaces';
import { makeQueryNewWorkspaceApiCall } from '@ostrich-domains/Workspace/api/new-workspace';
import { makeQueryUpdateLogoWorkspaceApiCall } from '@ostrich-domains/Workspace/api/update-logo';
import { makeQueryUpdateWorkspaceApiCall } from '@ostrich-domains/Workspace/api/update-workspace';
import { makeQueryUserWorkspaceApiCall } from '@ostrich-domains/Workspace/api/user-workspaces';

export default Object.freeze({
	makeQueryAllWorkspaceApiCall,
	makeQueryNewWorkspaceApiCall,
	makeQueryUpdateLogoWorkspaceApiCall,
	makeQueryUpdateWorkspaceApiCall,
	makeQueryUserWorkspaceApiCall,
});
