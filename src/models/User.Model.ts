import { model, Schema, SchemaTypes } from "mongoose";
import { UserModelType } from "src/types";

export enum userRoles {
  admin = "admin",
  user = "user",
  counselor = "counselor",
}

export enum accountTypes {
  basic = "basic",
  business = "business",
}

const UserSchema = new Schema<UserModelType>(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    accountType: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      enum: accountTypes,
    },
    confirmed:{
      type:Boolean,
      default:false
    },
    password: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      min: 6,
    },
    role: {
      type: String,
      enum: userRoles,
      required: true,
      lowercase: true,
      trim: true,
    },
    workspaces:{
        type:[{
            owner:SchemaTypes.ObjectId,
            members:Array,
            default:[],
        }],
        default:[]
    }
  },
  { timestamps: true }
);

export default model<UserModelType>("User", UserSchema);
