import { makeQueryNewFolderApiCall } from './new-folder-api';
import { makeQueryFoldersApiCall } from './get-folders-api';
import { makeQueryIdFolderApiCall } from './get-folder-by-id-api';
import { makeQueryFolderByNameApiCall } from './get-folder-by-name-api';
import { makeQueryWorkspaceFoldersApiCall } from './get-workspace-folder-api';
import { makeQueryUpdateCopyFolderApiCall } from './update-copy-folder-api';
import { makeQueryUpdateFolderApiCall } from './update-folder-api';
import { makeQueryUpdateMoveFolderApiCall } from './update-move-folder-api';
import { makeQueryDeleteFolderApiCall } from './delete-folder-api';

export default Object.freeze({
	makeQueryNewFolderApiCall,
	makeQueryFoldersApiCall,
	makeQueryIdFolderApiCall,
	makeQueryFolderByNameApiCall,
	makeQueryWorkspaceFoldersApiCall,
	makeQueryUpdateCopyFolderApiCall,
	makeQueryUpdateFolderApiCall,
	makeQueryUpdateMoveFolderApiCall,
	makeQueryDeleteFolderApiCall,
});
