import FolderInfoValidator from '@ostrich-app/features/Folders/utils/folderValidator';
import makeCreateFolderEntity from '@ostrich-app/features/Folders/entities/folder';

const createFolder = makeCreateFolderEntity({
	validator: FolderInfoValidator
});

export default createFolder;

// export type UserInfoValidator = typeof Validate
