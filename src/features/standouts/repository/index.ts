/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import standoutModel from '@ostrich-app/features/standouts/models';
import { IStandout, IStandoutRepository } from '../interfaces';

class StandoutRepository implements IStandoutRepository{
	createStandout: (workspaceId: string, data: IStandout) => Promise<any>;

	findWorkspaceStandouts: (workspaceId: string, limit: number, page: number) => Promise<any>;

	createstandout: (workspaceId: string, data: IStandout) =>
		/* eslint-disable @typescript-eslint/no-non-null-assertion */
		Promise<any>;

	findWorkspacestandouts: (workspaceId: string, limit: number, page: number) => Promise<any>;

	findByName = async (name: string) => {
		const standout = await standoutModel.findOne({ name });

		return standout;
	};

	findById = async (id: string) => {
		const standout = await standoutModel.findById(id);

		return standout;
	};

	findWorkspaceById = async (id: string) => {
		const workspace = await standoutModel.findById(id);

		return workspace;
	};

	find = async (limit: number, page: number) => {
		const standouts = await standoutModel.find()
			.limit(limit)
			.skip(limit * (page - 1));

		return standouts;
	};

	findstandouts = async (
		workspaceId: string,
		limit: number,
		page: number,
	) => {
		const workspacestandouts = await standoutModel.find({
			workspace: workspaceId,
		})
			.limit(limit)
			.skip(limit * (page - 1));

		return workspacestandouts;
	};

	updateById = async (id: string, data: IStandout) => {
		const editedstandout = await standoutModel.findByIdAndUpdate(
			id,
			{ ...data },
			{ new: true },
		);

		return editedstandout;
	};

	deleteById = async (id: string) => {
		await standoutModel.findByIdAndDelete(id);

		return true;
	};

	comment: (id: string) => Promise<any>;

	like: (userId: string, id: string) => Promise<any>;

	move = async (destinationWorkspace: string, standoutId: string) => {
		const movedstandout = await standoutModel.findByIdAndUpdate(standoutId, {
			workspace: destinationWorkspace,
		});

		return movedstandout;
	};

	copy = async (destinationWorkspace: string, standoutData: IStandout) => {
		const copiedstandout = await standoutModel.create({
			...standoutData,
			workspace: destinationWorkspace,
		});

		return copiedstandout;
	};
	
}

export default new StandoutRepository();
