/* eslint-disable @typescript-eslint/no-explicit-any */
import createDirectory from '@ostrich-app/utils/fileSystem/createDirectory';
import deleteFile from '@ostrich-app/utils/fileSystem/deleteFile';
import dirExistAsync from '@ostrich-app/utils/fileSystem/dirExistAsync';
import dirExistSync from '@ostrich-app/utils/fileSystem/dirExist';

// import { NODE_ENV } from "@ostrich-app/config"
import setEnvironmentVariables from '@ostrich-app/utils/fileSystem/envSetup';

export default Object.freeze({
	dirExistAsync,
	dirExistSync,
	createDirectory,
	deleteFile,
	setEnvironmentVariables
});
export {
	dirExistAsync,
	dirExistSync,
	setEnvironmentVariables,
	createDirectory,
	deleteFile
};
