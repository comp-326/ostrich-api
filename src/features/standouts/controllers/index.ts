/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { INext, IRequest, IResponse } from '@ostrich-app/common/types';
import { IStandoutController, IStandoutUseCases } from '@ostrich-app/features/standouts/interfaces';

class StandoutController implements IStandoutController{
	constructor(private useCase: IStandoutUseCases){ }

	softDelete = async (req: IRequest, res: IResponse, next: INext) => {
		return res.status(200).json({ working: 'OK' });
	};

	findById = async (req: IRequest, res: IResponse, next: INext) => {
		return res.status(200).json({ working: 'OK' });
	};

	findStandouts = async (req: IRequest, res: IResponse, next: INext) => {
		return res.status(200).json({ working: 'OK' });
	};

	findByName = async (req: IRequest, res: IResponse, next: INext) => {
		return res.status(200).json({ working: 'OK' });
	};

	findWorkspaceStandouts = async (req: IRequest, res: IResponse
		/* eslint-disable @typescript-eslint/no-explicit-any */
		, /* eslint-disable @typescript-eslint/no-explicit-any */ next: INext) => {
		return res.status(200).json({ working: 'OK' });
	};

	createStandout = async (req: IRequest, res: IResponse, next: INext) => {
		return res.status(200).json({ working: 'OK' });
	};

	copyStandout = async (req: IRequest, res: IResponse, next: INext) => {
		return res.status(200).json({ working: 'OK' });
	};

	updateStandout = async (req: IRequest, res: IResponse, next: INext) => {
		return res.status(200).json({ working: 'OK' });
	};

	moveStandout = async (req: IRequest, res: IResponse, next: INext) => {
		return res.status(200).json({ working: 'OK' });
	};

	hardDeleteStandout = async (req: IRequest, res: IResponse, next: INext) => {
		return res.status(200).json({ working: 'OK' });
	};

	findFolders = async (req: IRequest, res: IResponse, next: INext) => {
		return res.status(200).json({ name: 'Working' });
	};

	findWorkspaceFolders = async (req: IRequest, res: IResponse, next: INext) => {
		return res.status(200).json({ name: 'Working' });
	};

	createFolder = async (req: IRequest, res: IResponse, next: INext) => {
		return res.status(200).json({ name: 'Working' });
	};

	copyFolder = async (req: IRequest, res: IResponse, next: INext) => {
		return res.status(200).json({ name: 'Working' });
	};

	updateFolder = async (req: IRequest, res: IResponse, next: INext) => {
		return res.status(200).json({ name: 'Working' });
	};

	moveFolder = async (req: IRequest, res: IResponse, next: INext) => {
		return res.status(200).json({ name: 'Working' });
	};

	hardDeleteFolder = async (req: IRequest, res: IResponse, next: INext) => {
		return res.status(200).json({ name: 'Working' });
	};

}

export default StandoutController;
