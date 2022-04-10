import FolderInfoValidator from "../utils/FolderValidator"
import makeCreateFolderEntity from "./folder"

const createFolder = makeCreateFolderEntity({
	validator: FolderInfoValidator,
})

export default createFolder

// export type UserInfoValidator = typeof Validate
