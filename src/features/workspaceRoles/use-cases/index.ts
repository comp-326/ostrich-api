import { IWorkspaceRoleRepository, IWorkspaceRoleUseCase } from '../interfaces';

export class WorkspaceRoleUseCases implements IWorkspaceRoleUseCase{
	private readonly repository: IWorkspaceRoleRepository;

	constructor(repository: IWorkspaceRoleRepository){
		this.repository = repository;
	}

	addRoles = async () => {
		const roles = await this.repository.createRoles();

		return roles;
	};

	listRoles = async () => {
		const roles = await this.repository.findRoles();

		return roles;
	};

}
