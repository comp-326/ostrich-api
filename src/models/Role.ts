/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { model, Schema } from "mongoose"
import { Permission as p } from "."
import { IRoleDocument, IRoleModel } from "./types"

const RoleSchema: Schema<IRoleDocument> = new Schema(
	{
		name: {
			type: String,
		},
		permissions: {
			type: Number,
			default: 0,
		},
		default: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true },
)

RoleSchema.methods.hasPermission = function (permission: number): boolean {
	const permitted = (this.permissions & permission) === permission
	return permitted
}

RoleSchema.methods.addPermission = function (permission: number): void {
	if (!this.hasPermission(permission)) {
		this.permissions += permission
	}
}
RoleSchema.methods.removePermission = function (permission: number): void {
	if (this.hasPermission(permission)) {
		this.permissions -= permission
	}
}

RoleSchema.methods.resetPermission = function (): void {
	this.permissions = 0
}
RoleSchema.statics.insertRoles = async function () {
	const roles: { [prop: string]: number[] } = {
		["User"]: [
			p.VIEW,
			p.LIKE,
			p.COMMENT,
			p.WRITE,
			p.USER
		],
		["Creator"]: [
			p.VIEW,
			p.LIKE,
			p.COMMENT,
			p.WRITE,
			p.USER,
			p.CREATOR,

		],
		["CreatorLite"]: [
			p.VIEW,
			p.LIKE,
			p.COMMENT,
			p.WRITE,
			p.USER,
			p.CREATOR,
			p.CREATOR_LITE,
		],
		["Admin"]: [
			p.VIEW,
			p.LIKE,
			p.COMMENT,
			p.WRITE,
			p.USER,
			p.CREATOR,
			p.CREATOR_LITE,
			p.ADMIN,
		],
		["SuperAdmin"]: [
			p.VIEW,
			p.LIKE,
			p.COMMENT,
			p.WRITE,
			p.USER,
			p.CREATOR,
			p.CREATOR_LITE,
			p.ADMIN,
			p.SUPER_ADMIN,
		]
	}

	const defaultRole = "User"

	for (const r of Object.keys(roles)) {
		let role: IRoleDocument = await this.findOne({ name: r })
		if (!role) {
			role = new Role({ name: r })
		}
		role.resetPermission()
		for (const perm of roles[r]) {
			role.addPermission(perm)
		}
		role.default = role.name === defaultRole
		await role.save()
	}
}

RoleSchema.statics.getDefaultRole = async function (): Promise<IRoleDocument> {
	const roles = await Role.findOne({ default: true })
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	return roles!
}

export const Role = model<IRoleDocument, IRoleModel>("Role", RoleSchema)
// export default Role;
