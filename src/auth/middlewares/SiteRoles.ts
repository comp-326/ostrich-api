/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IRoleDocument } from "src/models/types"
import { UserModel, RoleModel } from "./../../models/index"
class SiteRoles {
	can = async function (
		userId: string,
		perm: number,
	): Promise<{ error: boolean; hasPermission: boolean; message: string }> {
		const user = await UserModel.findById(userId).populate("role")
		if (!user) {
			return {
				error: true,
				hasPermission: false,
				message: "User not found",
			}
		}

		const userRole: IRoleDocument | null = await RoleModel.findById(
			user.role._id
		)!
		const authorized = await userRole?.hasPermission(perm)
		if (authorized) {
			return {
				error: false,
				hasPermission: true,
				message: "Has permission",
			}
		}
		return {
			error: true,
			hasPermission: false,
			message: "No role associated with user",
		}
	}
}

export default SiteRoles
