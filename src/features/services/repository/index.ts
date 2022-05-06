/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IServices, IServicesRepository } from '@ostrich-app/features/services/interfaces';
import ServicesModel from '@ostrich-app/features/services/models';

class ServicesRepository implements IServicesRepository{
	findByName = async (name: string) => {
		const Services = await ServicesModel.findOne({ name });
		return Services;
	};

	findById = async (id: string) => {
		const Services = await ServicesModel.findById(id);
		return Services;
	};

	findWorkspaceById = async (id: string) => {
		const workspace = await ServicesModel.findById(id);
		return workspace;
	};

	find = async (limit: number, page: number) => {
		const Servicess = await ServicesModel.find()
			.limit(limit)
			.skip(limit * (page - 1));
		return Servicess;
	};

	findWorkspaceServicess = async (
		workspaceId: string,
		limit: number,
		page: number,
	) => {
		const workspaceServicess = await ServicesModel.find({
			workspace: workspaceId,
		})
			.limit(limit)
			.skip(limit * (page - 1));
		return workspaceServicess;
	};

	updateById = async (id: string, data: IServices) => {
		const editedServices = await ServicesModel.findByIdAndUpdate(
			id,
			{ ...data },
			{ new: true },
		);
		return editedServices;
	};

	deleteById = async (id: string) => {
		await ServicesModel.findByIdAndDelete(id);
		return true;
	};

	comment: (id: string) => Promise<any>;

	like: (userId: string, id: string) => Promise<any>;

	move = async (destinationWorkspace: string, ServicesId: string) => {
		const movedServices = await ServicesModel.findByIdAndUpdate(ServicesId, {
			workspace: destinationWorkspace,
		});
		return movedServices;
	};

	copy = async (destinationWorkspace: string, ServicesData: IServices) => {
		const copiedServices = await ServicesModel.create({
			...ServicesData,
			workspace: destinationWorkspace,
		});
		return copiedServices;
	};

	createServices = async (workspaceId: string, data: IServices) => {
		const newServices = await ServicesModel.create({
			...data,
			workspace: workspaceId,
		});
		return newServices;
	};
}

export default new ServicesRepository();
