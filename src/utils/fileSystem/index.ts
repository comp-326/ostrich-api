/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs"
import path from "path"
import crypto from "crypto"
import os from "os"
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
function setEnvironmentVariables(envFilePath: string) {
	// if (NODE_ENV === "development") {
	let filepath = ""
	const key = ""
	const value = ""
	try {
		filepath = path.join(path.dirname(envFilePath), ".env.example")
	} catch (err) {
		console.log("File does not exist")
		process.exit()
	}
	const fileContents = fs.readFileSync(filepath, "utf8").split(os.EOL)
	const oldData = fileContents.map((line) => {
		return line
	})
	const data: { [x: string]: string } = {}
	oldData.forEach((line) => {
		if (key === line.split("=")[0]) {
			data[key] = value
		} else {
			data[line.split("=")[0]] = line.split("=")[1]
		}
	})

	data["PORT"] = "4001"
	data["SECRET_KEY"] = crypto.randomBytes(64).toString("hex")
	data["REFRESH_KEY"] = crypto.randomBytes(64).toString("hex")
	data["API_VERSION"] = "/api/v1"
	data["HOST"] = "localhost"
	data["DATABASE_URL"] = "mongodb://localhost:27017/ostrich-dev-db"
	const buffer = Object.entries(data).map(([key, value]) => {
		return `${key}=${value}`
	})

	fs.writeFileSync(
		path.join(path.dirname(envFilePath), ".env"),
		buffer.join(os.EOL),
		"utf8",
	)
}

export default Object.freeze({
	dirExistAsync,
	dirExistSync,
	createDirectory,
	deleteFile,
	setEnvironmentVariables,
})
export {
	dirExistAsync,
	setEnvironmentVariables,
	dirExistSync,
	createDirectory,
	deleteFile,
}
