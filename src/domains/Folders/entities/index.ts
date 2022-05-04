import FolderInfoValidator from '@ostrich-app/domains/Folders/utils/folderValidator';
import makeCreateFolderEntity from '@ostrich-app/domains/Folders/entities/folder';

const createFolder = makeCreateFolderEntity({
	validator: FolderInfoValidator
});

export default createFolder;

// export type UserInfoValidator = typeof Validate
