/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IStandout, IStandoutRepository } from '../interfaces';
import StandoutModel from '@ostrich-app/features/standouts/models';

class StandoutRepository implements IStandoutRepository{
	createStandout: (workspaceId: string, data: IStandout) =>
		/* eslint-disable @typescript-eslint/no-non-null-assertion */
		Promise<any>;

	findWorkspaceStandouts: (workspaceId: string, limit: number, page: number) => Promise<any>;

	findByName = async (name: string) => {
		const Standout = await StandoutModel.findOne({ name });
		return Standout;
	};

	findById = async (id: string) => {
		const Standout = await StandoutModel.findById(id);
		return Standout;
	};

	findWorkspaceById = async (id: string) => {
		const workspace = await StandoutModel.findById(id);
		return workspace;
	};

	find = async (limit: number, page: number) => {
		const Standouts = await StandoutModel.find()
			.limit(limit)
			.skip(limit * (page - 1));
		return Standouts;
	};

	findStandouts = async (
		workspaceId: string,
		limit: number,
		page: number,
	) => {
		const workspaceStandouts = await StandoutModel.find({
			workspace: workspaceId,
		})
			.limit(limit)
			.skip(limit * (page - 1));
		return workspaceStandouts;
	};

	updateById = async (id: string, data: IStandout) => {
		const editedStandout = await StandoutModel.findByIdAndUpdate(
			id,
			{ ...data },
			{ new: true },
		);
		return editedStandout;
	};

	deleteById = async (id: string) => {
		await StandoutModel.findByIdAndDelete(id);
		return true;
	};

	comment: (id: string) => Promise<any>;

	like: (userId: string, id: string) => Promise<any>;

	move = async (destinationWorkspace: string, StandoutId: string) => {
		const movedStandout = await StandoutModel.findByIdAndUpdate(StandoutId, {
			workspace: destinationWorkspace,
		});
		return movedStandout;
	};

	copy = async (destinationWorkspace: string, StandoutData: IStandout) => {
		const copiedStandout = await StandoutModel.create({
			...StandoutData,
			workspace: destinationWorkspace,
		});
		return copiedStandout;
	};
	
}

export default new StandoutRepository();
