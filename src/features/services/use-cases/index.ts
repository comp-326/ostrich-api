import { IServices, IServicesRepository,IServicesUseCases } from '../interfaces';

export class FolderUseCase implements IServicesUseCases{
	constructor(private repository: IServicesRepository){}

	addServices: (ServicesData: IServices) => Promise<any>;

	copyServices: (ServicesData: IServices) => Promise<any>;

	editServices: (ServicesData: IServices) => Promise<any>;

	listServicesById: (ServicesData: IServices) => Promise<any>;

	listServicesByName: (ServicesData: IServices) => Promise<any>;

	listServicess: (ServicesData: IServices) => Promise<any>;

	listWorkspaceServicess: (ServicesData: IServices) => Promise<any>;

	moveServices: (ServicesData: IServices) => Promise<any>;

	softRemoveServices: (ServicesData: IServices) => Promise<any>;

	hardRemoveServices: (ServicesData: IServices) => Promise<any>;
	
	
}
