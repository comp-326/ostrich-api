import { Document} from "mongoose";

type Mapper<T extends { [prop: string]: string }> = {
  [Key in keyof T]: T[Key];
};
type NodeConfTypes = {
  // [prop:string]:string
  production: "production";
  development: "development";
  testing: "testing";
};

export type UserRoles = {
  admin: "admin";
  user: "user";
  counselor: "counselor";
  [prop:string]:string
};
export type genderType = {
    male: "male";
    female: "female";
    other: "other";
    [prop:string]:string
  };

  export type accountType = {
    basic: "basic";
    business: "business";
    [prop:string]:string
  };

export type WorkspaceModelType = {
  [prop:string]:any;
  owner: string;
  members: string[];
  _doc: any;
} & Document;

export type UserModelType = {
  username: string;
  gender:Mapper<genderType>[keyof Mapper<genderType>];
  email: string;
  role: Mapper<UserRoles>[keyof Mapper<UserRoles>];
  firstName: string;
  password: string;
  confirmed:boolean,
  lastName: string;
  salutation?:string
  workspaces: WorkspaceModelType[];
  accountType:Mapper<accountType>[keyof Mapper<accountType>]
  _doc: any;
} & Document;

export type NodeConfType = Mapper<NodeConfTypes>[keyof Mapper<NodeConfTypes>];
