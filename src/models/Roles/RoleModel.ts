/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import '@ostrich-db';
import Permissions from '@ostrich-constants/permissions';

export type RoleType = {
	name: string;
	permissions: number;
	default: boolean;
};

export type RoleTypeDocument = {
	[x: string]: any;
	resetPermission: () => void;
	addPermission: (permission: number) => void;
	removePermission: (permission: number) => void;
	hasPermission: (permission: number) => boolean;
} & RoleType &
	mongoose.Document;

export type RoleTypeModel = {
	insertRoles: () => void;
	getDefaultRole: () => Promise<RoleTypeDocument>;
	InsertRoles: () => Promise<any>;
} & mongoose.Model<RoleTypeDocument>;

const RoleModelSchema: mongoose.Schema<RoleTypeDocument> = new mongoose.Schema(
	{
		name: { type: String, required: true },
		default: { type: Boolean, default: false },
		permissions: { type: Number, default: 0, min: 0 }
	},
	{ timestamps: true }
);

RoleModelSchema.methods.hasPermission = function (permission: number) {
	const permitted = (this.permissions & permission) === permission;
	return permitted;
};

RoleModelSchema.methods.addPermission = function (permission: number) {
	if (!this.hasPermission(permission)) {
		this.permissions += permission;
	}
};
RoleModelSchema.methods.removePermission = function (permission: number) {
	if (this.hasPermission(permission)) {
		this.permissions -= permission;
	}
};

RoleModelSchema.methods.resetPermission = function () {
	this.permissions = 0;
};

RoleModelSchema.statics.InsertRoles = async function () {
	const roles: { [key: string]: number[] } = {
		['User']: [
			Permissions.VIEW,
			Permissions.LIKE,
			Permissions.SHARE,
			Permissions.COMMENT,
			Permissions.USER
		],
		['Admin']: [
			Permissions.VIEW,
			Permissions.LIKE,
			Permissions.SHARE,
			Permissions.COMMENT,
			Permissions.USER,
			Permissions.ADMIN
		]
	};
	const defaultRole = 'User';
	for (const r of Object.keys(roles)) {
		let role = await RoleModel.findOne({ name: r });
		if (!role) {
			role = new RoleModel({ name: r });
		}
		role.resetPermission();
		for (const perm of roles[r]) {
			role.addPermission(perm);
		}
		role.default = role.name === defaultRole;
		await role.save();
	}
};

const RoleModel = mongoose.model<RoleTypeDocument, RoleTypeModel>(
	'Role',
	RoleModelSchema
);
export default RoleModel;
