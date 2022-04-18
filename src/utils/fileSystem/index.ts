/* eslint-disable @typescript-eslint/no-explicit-any */
import createDirectory from './createDirectory';
import deleteFile from './deleteFile';
import dirExistSync from './dirExist';
import dirExistAsync from './dirExistAsync';

// import { NODE_ENV } from "@root/config"
import setEnvironmentVariables from './envSetup';

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
