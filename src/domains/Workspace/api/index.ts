import { makeQueryAllWorkspaceApiCall } from './get-workspaces';
import { makeQueryNewWorkspaceApiCall } from './new-workspace';
import { makeQueryUpdateLogoWorkspaceApiCall } from './update-logo';
import { makeQueryUpdateWorkspaceApiCall } from './update-workspace';
import { makeQueryUserWorkspaceApiCall } from './user-workspaces';

export default Object.freeze({
	makeQueryAllWorkspaceApiCall,
	makeQueryNewWorkspaceApiCall,
	makeQueryUpdateLogoWorkspaceApiCall,
	makeQueryUpdateWorkspaceApiCall,
	makeQueryUserWorkspaceApiCall,
});
