/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs"

// import { NODE_ENV } from "@root/config"

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
	}
}
/**
 *Delete file/path
 */
const deleteFile = async (path: string) => {
	if (!fs.existsSync(path)) {
		try {
			fs.unlinkSync(path)
		} catch (error: any) {
			console.log(error.message)
		}
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
