/* eslint-disable @typescript-eslint/no-explicit-any */
import Permissions from '@ostrich-app-constants/workspacePermissions';
import mongoose from '@ostrich-app-db/mongodb';
import { IWorkspaceRoleDocument, IWorkspaceRoleDocumentModel } from './interfaces';

const workspaceRoleRoleSchema: mongoose.Schema<IWorkspaceRoleDocument> = new mongoose.Schema({
	default: {
		type: Boolean,
	},
	name: {
		type: String,
		required: true,
		unique: true
	},
	permissions: {
		type: Number,
		required: true,
		min: 0
	},

}, {
	timestamps: true
});


workspaceRoleRoleSchema.methods.hasPermission = function (permission: number) {
	const permitted = (this.permissions & permission) === permission;

	return permitted;
};

workspaceRoleRoleSchema.methods.addPermission = function (permission: number) {
	if (!this.hasPermission(permission))
		this.permissions += permission;

};
workspaceRoleRoleSchema.methods.removePermission = function (permission: number) {
	if (this.hasPermission(permission))
		this.permissions -= permission;

};

workspaceRoleRoleSchema.methods.resetPermission = function () {
	this.permissions = 0;
};

workspaceRoleRoleSchema.statics.getDefaultRole = async function () {
	const defaultRole = await workspaceRoleRoleModel.findOne({ default: true });

	return defaultRole;
};

workspaceRoleRoleSchema.statics.InsertRoles = async function () {
	const roles: { [key: string]: number[] } = {
		['member']: [
			Permissions.VIEW,
			Permissions.LIKE,
			Permissions.SHARE,
			Permissions.COMMENT,
			Permissions.MEMBER,
		],
		['creator_lite']: [
			Permissions.VIEW,
			Permissions.LIKE,
			Permissions.SHARE,
			Permissions.COMMENT,
			Permissions.MEMBER,
			Permissions.CREATOR_LITE,

		],
		['creator']: [
			Permissions.VIEW,
			Permissions.LIKE,
			Permissions.SHARE,
			Permissions.COMMENT,
			Permissions.MEMBER,
			Permissions.CREATOR_LITE,
			Permissions.CREATOR,
			Permissions.INVITE
		],
		['counselor']: [
			Permissions.VIEW,
			Permissions.LIKE,
			Permissions.SHARE,
			Permissions.COMMENT,
			Permissions.MEMBER,
			Permissions.CREATOR_LITE,
			Permissions.CREATOR,
			Permissions.COUNSELOR,
			Permissions.INVITE
		],
		['admin']: [
			Permissions.VIEW,
			Permissions.LIKE,
			Permissions.SHARE,
			Permissions.COMMENT,
			Permissions.MEMBER,
			Permissions.CREATOR_LITE,
			Permissions.CREATOR,
			Permissions.COUNSELOR,
			Permissions.INVITE,
			Permissions.ADMIN
		]
	};

	const defaultRole = 'member';
	Object.keys(roles).forEach(async (r) => {
		let role = await workspaceRoleRoleModel.findOne({ name: r });
		if (!role)
			role = new workspaceRoleRoleModel({ name: r });

		role.resetPermission();
		for (const perm of roles[r])
			role.addPermission(perm);

		role.default = role.name === defaultRole;
		await role.save();
	});
};
const workspaceRoleRoleModel = mongoose.model<IWorkspaceRoleDocument, IWorkspaceRoleDocumentModel>('WorkspaceRoles', workspaceRoleRoleSchema);
export default workspaceRoleRoleModel;