/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs"

/**
 *Check for path existance
 */
const dirExistAsync = async (path: string) => {
	let exist = false
	fs.access(path, async (err) => {
		if (err) {
			exist = false
		} else {
			exist = true
		}
	})
	return exist
}

/**
 * if file/path does not exist, create file/path
 */
const createDirectory = async (path: string) => {
	if (!fs.existsSync(path)) {
		fs.mkdirSync(path, { recursive: true })
		console.log("Directory created")
	} else {
		console.log("Directory exist")
	}
}
/**
 *Delete file/path
 */
const deleteFile = async (path: string) => {
	if (!fs.existsSync(path)) {
		try {
			fs.unlinkSync(path)
			console.log("File deleted")
		} catch (error: any) {
			console.log(error.message)
		}
	} else {
		console.log("Directory exist")
	}
}

/**
 *Check for file existance
 */
const dirExistSync = (path: string) => {
	return fs.existsSync(path)
}

export default Object.freeze({
	dirExistAsync,
	dirExistSync,
	createDirectory,
	deleteFile,
})
export { dirExistAsync, dirExistSync, createDirectory, deleteFile }
