import { Router } from "express"
import fController from "../controllers/FolderController"
import auth from "../middlewares/AuthMiddleware"
import {imageUpload} from "../serverUpload"

const router = Router()
/**
 * ****************** CREATE NEW FOLDER *************
 */
router.route("/new").post(
	auth.loginRequired,
	imageUpload.fields([
		{ name: "image1", maxCount: 1 },
		{ name: "image2", maxCount: 2 },
		{ name: "image3", maxCount: 3 },
		{ name: "image4", maxCount: 4 },
		{ name: "image5", maxCount: 5 },
		{ name: "image6", maxCount: 6 },
	]),
	fController.createFolder,
	fController.uploadImage,
)
/**
 * *************** UPDATE FOLDER *********
 */
router.route("/new").post(
	auth.loginRequired,
	imageUpload.fields([
		{ name: "image1", maxCount: 1 },
		{ name: "image2", maxCount: 2 },
		{ name: "image3", maxCount: 3 },
		{ name: "image4", maxCount: 4 },
		{ name: "image5", maxCount: 5 },
		{ name: "image6", maxCount: 6 },
	]),
	fController.updateFolder,
	fController.uploadImage,
)
/**
 * ***************** MOVE FOLDER TO ANOTHER WORKSPACE ***********
 */
router
	.route("/move/:id")
	.put(auth.loginRequired, fController.moveFolderToAnotherWorkspace)
/**
 * ***************** COPY FOLDER TO ANOTHER WORKSPACE ************
 */
router
	.route("/copy/:id")
	.put(auth.loginRequired, fController.copyToAnotherWorkspace)
/**
 * ****************** GET USER FOLDERS *********
 */
router.route("/single/:id").get(fController.getUserWorkspaces)
/**
 * *************** GET FOLDERS ********************
 */
router.route("/").get(fController.getFolders)
/**
 * *************** DELETE FOLDER ********************
 */
router.route("/delete").get(fController.deleteFolder)
/**
 * *************** GET STANDOUTS ********************
 */
router.route("/statdouts").get(fController.getStandouts)

export default router
