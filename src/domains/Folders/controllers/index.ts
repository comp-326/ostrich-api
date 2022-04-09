import {
	addFolderUseCase,
	copyFolderUseCase,
	editFolderUseCase,
	listFolderByIdUseCase,
	listFolderByNameUseCase,
	listFoldersUseCase,
	listWorkspaceFoldersUseCase,
	moveFolderUseCase,
	removeFolderUseCase,
} from "../use-cases"
import makeBuildPostFolderController from "./post-folder"
import makeBuildFindByIdFolderController from "./find-by-id"
import makeBuildFindByNameFolderController from "./find-by-name"
import makeBuildFindFoldersController from "./find-folders"
import makeBuildFindWorkspaceFoldersController from "./find-workspace-folders"
import makeBuildUpdateByIdFolderController from "./put-folder"
import makeBuildUpdateCopyFolderController from "./put-copy-folder"
import makeBuildUpdateMoveFolderController from "./put-move-folder"
import makeBuildDeleteFolderController from "./delete-folder"

const postFolder = makeBuildPostFolderController({ create: addFolderUseCase })
const findById = makeBuildFindByIdFolderController({
	listById: listFolderByIdUseCase,
})
const findByName = makeBuildFindByNameFolderController({
	listByName: listFolderByNameUseCase,
})
const findFolders = makeBuildFindFoldersController({
	find: listFoldersUseCase,
})
const findWorkspaceFolders = makeBuildFindWorkspaceFoldersController({
	find: listWorkspaceFoldersUseCase,
})
const putFolder = makeBuildUpdateByIdFolderController({
	update: editFolderUseCase,
})
const putCopyFolder = makeBuildUpdateCopyFolderController({
	copy: copyFolderUseCase,
})
const putMoveFolder = makeBuildUpdateMoveFolderController({
	move: moveFolderUseCase,
})

const deleteFolder = makeBuildDeleteFolderController({
	remove: removeFolderUseCase,
})

export default Object.freeze({
	postFolder,
	findById,
	findByName,
	findFolders,
	findWorkspaceFolders,
	putFolder,
	putCopyFolder,
	putMoveFolder,
	deleteFolder,
})

export {
	postFolder,
	findById,
	findByName,
	findFolders,
	findWorkspaceFolders,
	putFolder,
	putCopyFolder,
	putMoveFolder,
	deleteFolder,
}

export type FolderControllerType =
	| typeof postFolder
	| typeof findById
	| typeof findByName
	| typeof findFolders
	| typeof findWorkspaceFolders
	| typeof putFolder
	| typeof putCopyFolder
	| typeof putMoveFolder
	| typeof deleteFolder
