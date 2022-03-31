import fs from "fs"

/**
 *
 * @param {string} path
 * @returns
 */
const dirExistAsync = async (path:string) => {
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
 *
 * @param {string} path
 * @returns
 */
const createDirectory = async (path:string) => {
	if (!fs.existsSync(path)) {
		fs.mkdirSync(path, { recursive: true })
		console.log("Directory created")
	} else {
		console.log("Directory exist")
	}
}
/**
 *
 * @param {string} path
 * @returns
 */
const deleteFile = async (path:string) => {
	if (!fs.existsSync(path)) {
		try {
			fs.unlinkSync(path)
			console.log("File deleted")
		} catch (error:any) {
			console.log(error.message)
		}
	} else {
		console.log("Directory exist")
	}
}

/**
 *
 * @param { string } path
 * @returns
 */
const dirExistSync = (path:string) => {
	return fs.existsSync(path)
}

export default Object.freeze({
	dirExistAsync,
	dirExistSync,
	createDirectory,
	deleteFile,
})
export { dirExistAsync, dirExistSync, createDirectory, deleteFile }
