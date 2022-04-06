/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IWorkspaceEntity {
	owner: Record<string, any>
	name: string
	type: "personal" | "business" | "education"
	logo: { public_id: string; url: string }
}

export interface IWorkspaceRepository {
	create: (workspace: IWorkspaceEntity) => Promise<any>
	findById: (id: string) => Promise<any>
	findUserWorkspaces: (userId:string) => Promise<any>
	find: (
		limit: number,
		offset: number,
		query?: { [x: string]: any },
	) => Promise<any>
	delete: (id: string) => Promise<any>
	updateById: (id: string, data: IWorkspaceEntity) => Promise<any>
    changeUserRole:(userId:string,workspaceId:string,role:string)=>Promise<any>
}
