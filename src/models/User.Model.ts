import { model, Schema } from "mongoose"
import { UserModelType } from "src/types"


const UserSchema = new Schema<UserModelType>({})


export default model<UserModelType>("User", UserSchema)