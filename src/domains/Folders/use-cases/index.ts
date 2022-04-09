import FolderRepository from "../FolderRepository"
import makeAddFolderUseCase from "./add-folder"
import makeCopyFolderUseCase from "./copy-folder"
import makeEditFolderUseCase from "./edit-folder"
import makeListFolderById from "./list-folder-by-id"
import makeListFolderByNameUseCase from "./list-folder-by-name"
import makeListFoldersUseCase from "./list-folders"
import makeListWorkspaceFoldersUseCase from "./list-workspace-folders"
import makeMoveFolderUseCase from "./move-folder"
import makeRemoveFolderUseCase from "./remove-folder"

const addFolderUseCase = makeAddFolderUseCase({ folderDB: FolderRepository })
const editFolderUseCase = makeEditFolderUseCase({ folderDB: FolderRepository })
const listFolderByNameUseCase = makeListFolderByNameUseCase({
	folderDB: FolderRepository,
})
const listFolderByIdUseCase = makeListFolderById({ folderDB: FolderRepository })
const copyFolderUseCase = makeCopyFolderUseCase({ folderDB: FolderRepository })
const listWorkspaceFoldersUseCase = makeListWorkspaceFoldersUseCase({
	folderDB: FolderRepository,
})
const moveFolderUseCase = makeMoveFolderUseCase({ folderDB: FolderRepository })
const listFoldersUseCase = makeListFoldersUseCase({ folderDB: FolderRepository })
const removeFolderUseCase = makeRemoveFolderUseCase({
	folderDB: FolderRepository,
})

export default Object.freeze({
	addFolderUseCase,
	editFolderUseCase,
	listFolderByNameUseCase,
	listFolderByIdUseCase,
	copyFolderUseCase,
	removeFolderUseCase,
	listWorkspaceFoldersUseCase,
	listFoldersUseCase,
	moveFolderUseCase,
})

export {
	addFolderUseCase,
	editFolderUseCase,
	listFolderByNameUseCase,
	listFolderByIdUseCase,
	copyFolderUseCase,
	removeFolderUseCase,
	listWorkspaceFoldersUseCase,
	listFoldersUseCase,
	moveFolderUseCase,
}

export type FolderUseCasesType =
	| typeof addFolderUseCase
	| typeof editFolderUseCase
	| typeof listFolderByNameUseCase
	| typeof listFolderByIdUseCase
	| typeof copyFolderUseCase
	| typeof removeFolderUseCase
	| typeof listWorkspaceFoldersUseCase
	| typeof listFoldersUseCase
	| typeof moveFolderUseCase
