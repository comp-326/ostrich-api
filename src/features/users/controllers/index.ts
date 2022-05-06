/* eslint-disable @typescript-eslint/no-explicit-any */
import IRequest from '@ostrich-app/common/interfaces/request';
import { IResponse } from '@ostrich-app/common/types';
import { IUserController } from '@ostrich-app/features/users/interfaces';
import { IUserUseCases } from '../interfaces';
import ResponseFormatter from '@ostrich-app/common/ResponseFormatter';

/**
 *
 * Brief description of the class here
 * @extends ParentClassNameHereIfAny
 * @implements {IUserController}
 */
class UserController implements IUserController{
	protected useCase: IUserUseCases;

	constructor(useCase: IUserUseCases){
		this.useCase = useCase;
	}

	/**
	 * Soft delete a user from db
	 * @summary A simple delete of user entity
	 * @param {IRequest} req - Express default request obj
	 * @param {IResponse} res - Express default rquest obj
	 * @return {IResponse} Response date returned by user usecase
	 */
	softDeleteUser = async (req: IRequest, res: IResponse) => {
		const { status, data, msg } = await this.useCase.softRemoveUser(
			req.params.id
		);

		return res.status(200).json(data);
	};

	/**
	 * Controller obj.
	 * @summary Summary
	 * @param {IRequest} req Express default request obj
	 * @param {IResponse} res Express default response obj
	 * @return {IResponse} Response date returned by user usecase
	 */
	deleteUser = async (req: IRequest, res: IResponse) => {
		const { status, data, msg } = await this.useCase.hardRemoveUser(
			req.params.id
		);

		return res.status(200).json(data);
	};

	/**
	 * Controller obj.
	 * @summary Summary
	 * @param {IRequest} req Express default request obj
	 * @param {IResponse} res Express default response obj
	 * @return {IResponse} Response date returned by user usecase
	 */
	findUserByEmail = async (req: IRequest, res: IResponse) => {
		const { status, data, msg } = await this.useCase.listUserByEmail(
			req.body.email
		);

		return res.status(200).json(data);
	};

	/**
	 * Controller obj.
	 * @summary Summary
	 * @param {IRequest} req Express default request obj
	 * @param {IResponse} res Express default response obj
	 * @return {IResponse} Response date returned by user usecase
	 */
	findUserById = async (req: IRequest, res: IResponse) => {
		const { status, data, msg } = await this.useCase.listUserById(
			req.params.id
		);

		return res.status(200).json(data);
	};

	/**
	 * Controller obj.
	 * @summary Summary
	 * @param {IRequest} req Express default request obj
	 * @param {IResponse} res Express default response obj
	 * @return {IResponse} Response date returned by user usecase
	 */
	createUser = async (req: IRequest, res: IResponse) => {
		const { status, data, msg } = await this.useCase.sendAccountActivationLink(
			req.body.email
		);

		return res.status(200).json(data);
	};

	/**
	 * Controller obj.
	 * @summary Summary
	 * @param {IRequest} req Express default request obj
	 * @param {IResponse} res Express default response obj
	 * @return {IResponse} Response date returned by user usecase
	 */
	getAccountActivationLink = async (req: IRequest, res: IResponse) => {
		const { status, data, msg } = await this.useCase.sendAccountActivationLink(
			req.body.email
		);

		return res.status(200).json(data);
	};

	/**
	 * Controller obj.
	 * @summary Summary
	 * @param {IRequest} req Express default request obj
	 * @param {IResponse} res Express default response obj
	 * @return {IResponse} Response date returned by user usecase
	 */
	getPasswordResetLink = async (req: IRequest, res: IResponse) => {
		const { status, data, msg } = await this.useCase.sendPasswordResetLink(
			req.body.email
		);

		return res.status(200).json(data);
	};

	/**
	 * Controller obj.
	 * @summary Summary
	 * @param {IRequest} req Express default request obj
	 * @param {IResponse} res Express default response obj
	 * @return {IResponse} Response date returned by user usecase
	 */
	resetAccountPassword = async (req: IRequest, res: IResponse) => {
		const { status, data, msg } = await this.useCase.sendPasswordResetLink(
			req.body.email
		);

		return res.status(200).json(data);
	};

	/**
	 * Controller obj.
	 * @summary Summary
	 * @param {IRequest} req Express default request obj
	 * @param {IResponse} res Express default response obj
	 * @return {IResponse} Response date returned by user usecase
	 */
	activateAccount = async (req: IRequest, res: IResponse) => {
		const { status, data, msg } = await this.useCase.activateUserAccount(
			req.body.email
		);

		return res.status(200).json(data);
	};

	/**
	 * Controller obj.
	 * @summary Summary
	 * @param {IRequest} req Express default request obj
	 * @param {IResponse} res Express default response obj
	 * @return {IResponse} Response date returned by user usecase
	 */
	findUsers = async (req: IRequest, res: IResponse) => {
		const { limit, page } = req.params;
		const { status, data, msg } = await this.useCase.listUsers({
			limit: limit ? parseInt(limit) : 20,
			offset: page ? parseInt(page) : 1
		});

		return res
			.status(200)
			.json(
				ResponseFormatter.SucessWithData({ status, msg, data, statusCode: 200 })
			);
	};

	/**
	 * Controller obj.
	 * @summary Summary
	 * @param {IRequest} req Express default request obj
	 * @param {IResponse} res Express default response obj
	 * @return {IResponse} Response date returned by user usecase
	 */
	updateAccount = async (req: IRequest, res: IResponse) => {
		const { id } = req.params;
		const { status, data, msg } = await this.useCase.editUserProfile(
			id,
			req.body
		);

		return res.status(200).json(data);
	};

	/**
	 * Controller obj.
	 * @summary Summary
	 * @param {IRequest} req Express default request obj
	 * @param {IResponse} res Express default response obj
	 * @return {IResponse} Response date returned by user usecase
	 */
	updateProfilePic = async (req: IRequest, res: IResponse) => {
		const { id } = req.params;
		const { status, data, msg } = await this.useCase.changeUserPassword(
			req.body
		);

		return res.status(200).json(data);
	};

	/**
	 * Controller obj.
	 * @summary Summary
	 * @param {IRequest} req Express default request obj
	 * @param {IResponse} res Express default response obj
	 * @return {IResponse} Response date returned by user usecase
	 */
	updatePassword = async (req: IRequest, res: IResponse) => {
		const { id } = req.params;
		const { status, data, msg } = await this.useCase.changeUserPassword(
			req.body
		);

		return res.status(200).json(data);
	};
}

export default UserController;
