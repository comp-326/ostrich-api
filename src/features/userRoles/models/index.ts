/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUserRoleDocument, IUserRoleDocumentModel } from '@ostrich-app/features/userRoles/models/interfaces';
import Permissions from '@ostrich-app/constants/permissions';
import mongoose from '@ostrich-app/db/mongodb';

const userRoleSchema: mongoose.Schema<IUserRoleDocument> = new mongoose.Schema({
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

const userRoleModel = mongoose.model<IUserRoleDocument, IUserRoleDocumentModel>('UserRoles', userRoleSchema);
userRoleSchema.methods.hasPermission = function (permission: number){
	const permitted = (this.permissions & permission) === permission;
	return permitted;
};

userRoleSchema.methods.addPermission = function (permission: number){
	if (!this.hasPermission(permission))
		this.permissions += permission;

};
userRoleSchema.methods.removePermission = function (permission: number){
	if (this.hasPermission(permission))
		this.permissions -= permission;

};

userRoleSchema.methods.resetPermission = function (){
	this.permissions = 0;
};

userRoleSchema.statics.InsertRoles = async function (){
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
	Object.keys(roles).forEach(async(r) => {
		let role = await userRoleModel.findOne({ name: r });
		if (!role)
			role = new userRoleModel({ name: r });

		role.resetPermission();
		for (const perm of roles[r])
			role.addPermission(perm);

		role.default = role.name === defaultRole;
		await role.save();
	});
};

export default userRoleModel;