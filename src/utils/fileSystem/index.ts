/* eslint-disable @typescript-eslint/no-explicit-any */
import createDirectory from '@ostrich-utils/fileSystem/createDirectory';
import deleteFile from '@ostrich-utils/fileSystem/deleteFile';
import dirExistSync from '@ostrich-utils/fileSystem/dirExist';
import dirExistAsync from '@ostrich-utils/fileSystem/dirExistAsync';

// import { NODE_ENV } from "@root/config"
import setEnvironmentVariables from '@ostrich-utils/fileSystem/envSetup';

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
