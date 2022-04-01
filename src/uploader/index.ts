import multer from "multer"
import { BASE_DIR } from "@root/config"
import path from "path"
import { createDirectory } from "@root/utils/uploadUtils"

/**
 * ************************* UPLOAD ONLY VIDEOS *****************
 */
const videoStorage = multer.diskStorage({
	destination: (_req, _file, cb) => {
		const uploadPath = path.join(BASE_DIR, "public/uploads/videos")
		createDirectory(uploadPath)
		cb(null, uploadPath)
	},
	filename: (_req, file, cb) => {
		const fileName = `video_file_upload_${new Date().getTime()}${path.extname(
			file.originalname,
		)}`
		cb(null, fileName)
	},
})
const videoFileFilters: multer.Options["fileFilter"] = (_req, file, cb) => {
	const mime = file.mimetype
	if (
		mime === "video/mp4" ||
		mime === "application/x-mpegURL" ||
		mime === "video/MP2T" ||
		mime === "video/3gpp" ||
		mime === "video/x-fvl" ||
		mime === "video/quicktime" ||
		mime === "video/x-ms-wmv"
	) {
		cb(null, true)
	}
	cb(null, false)
}

/**
 * ************************* UPLOAD ONLY AUDIOS *********************
 */
const audioStorage = multer.diskStorage({
	destination: (_req, _file, cb) => {
		const uploadPath = path.join(BASE_DIR, "public/uploads/audio")
		createDirectory(uploadPath)
		cb(null, uploadPath)
	},
	filename: (_req, file, cb) => {
		const fileName = `audio_file_upload_${new Date().getTime()}${path.extname(
			file.originalname,
		)}`
		cb(null, fileName)
	},
})
const audioFileFilters: multer.Options["fileFilter"] = (_req, file, cb) => {
	const mime = file.mimetype
	if (
		mime === "auido/L24" ||
		mime === "audio/mid" ||
		mime === "audio/mpeg" ||
		mime === "audio/mp4" ||
		mime === "audio/x-mpegurl" ||
		mime === "audio/ogg" ||
		mime === "audio/vnd.wav" ||
		mime === "audio/x-aiff" ||
		mime === "audio/basic"
	) {
		cb(null, true)
	}
	cb(null, false)
}

/**
 * ************************* UPLOAD ONLY IMAGES *********************
 */
const imageStorage = multer.diskStorage({
	destination: (_req, _file, cb) => {
		const uploadPath = path.join(BASE_DIR, "public/uploads/images")
		createDirectory(uploadPath)
		cb(null, uploadPath)
	},
	filename: (_req, file, cb) => {
		const fileName = `image_file_upload_${new Date().getTime()}${path.extname(
			file.originalname,
		)}`
		cb(null, fileName)
	},
})
const imageFilters: multer.Options["fileFilter"] = (_req, file, cb) => {
	const mime = file.mimetype
	if (
		mime === "image/png" ||
		mime === "image/jpg" ||
		mime === "image/jpeg" ||
		mime === "image/webp"
	) {
		cb(null, true)
	}
	cb(null, false)
}

const imageUpload = multer({
	storage: imageStorage,
	fileFilter: imageFilters,
	limits: { fileSize: 1024 * 1024 * 3 },
})

const videoUpload = multer({
	storage: videoStorage,
	fileFilter: videoFileFilters,
	limits: { fileSize: 1024 * 1024 * 20 },
})

const audioUpload = multer({
	storage: audioStorage,
	fileFilter: audioFileFilters,
	limits: { fileSize: 1024 * 1024 * 10 },
})

export default Object.freeze({ audioUpload, imageUpload, videoUpload })
export { audioUpload, imageUpload, videoUpload }