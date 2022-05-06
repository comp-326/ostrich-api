/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import responseFormatter from '@ostrich-app/common/responseFormatter';
import verifyUserJWT from '@ostrich-app/features/users/utils/jwt/verifyUserJWT';
import { INext, IRequest, IResponse, JWTPayloadType } from '@ostrich-app/common/types';
import { IUserController, IUserUseCases } from '@ostrich-app/features/users/interfaces';


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
	softDeleteUser = async (req: IRequest, res: IResponse, next: INext) => {
		const { status, data, msg } = await this.useCase.softRemoveUser(
			req.params.id
		);

		return res.status(200).json(responseFormatter.ResponseWithData({
			data,
			message: 'Success',
			status: 'ok',
			statusCode: 200,
			params: {}
		}));
	};


	deleteUser = async (req: IRequest, res: IResponse, next: INext) => {
		const { status, data, msg } = await this.useCase.hardRemoveUser(
			req.params.id
		);

		return res.status(200).json(data);
	};


	findUserByEmail = async (req: IRequest, res: IResponse, next: INext) => {
		const { status, data, msg } = await this.useCase.listUserByEmail(
			req.body.email
		);

		return res.status(200).json(data);
	};


	findUserById = async (req: IRequest, res: IResponse, next: INext) => {
		const { status, data, msg } = await this.useCase.listUserById(
			req.params.id
		);

		return res.status(200).json(data);
	};


	createUser = async (req: IRequest, res: IResponse, next: INext) => {
		try {

			await this.useCase.addNewUser(
				req.body
			);

			return res.sendStatus(201);
		} catch (err: any) {
			return next(err);
		}
	};


	getAccountActivationLink = async (req: IRequest, res: IResponse, next: INext) => {
		try {
			await this.useCase.sendAccountActivationLink(
				req.body.email
			);

			return res.status(200).json({
				message: 'Activation email has been sent to your email address',
				status: 'ok',
				statusCode: 200,
				params: {},
				data: {}
			});
		} catch (err) {
			return next(err);
		}
	};


	getPasswordResetLink = async (req: IRequest, res: IResponse, next: INext) => {
		try {
			await this.useCase.sendPasswordResetLink(
				req.body.email
			);

			return res.status(200).json({
				message: 'Password reset email has been sent to your email address',
				status: 'ok',
				statusCode: 200,
				params: {},
				data: {}
			});
		} catch (err) {
			return next(err);
		}
	};


	resetAccountPassword = async (req: IRequest, res: IResponse, next: INext) => {
		try {
			const { userId } = await verifyUserJWT.verifyPasswordToken(req.params.token) as unknown as JWTPayloadType;
			await this.useCase.changeUserPassword(userId,
				req.body
			);

			return res.sendStatus(200);
		} catch (err) {
			return next(err);
		}
	};


	activateAccount = async (req: IRequest, res: IResponse, next: INext) => {
		try {
			await this.useCase.activateUserAccount(
				req.body.email
			);

			return res.sendStatus(200);
		} catch (err) {
			return next(err);
		}
	};


	findUsers = async (req: IRequest, res: IResponse, next: INext) => {
		const { limit, page } = req.params;
		const { status, data, msg } = await this.useCase.listUsers({
			limit: limit ? parseInt(limit) : 20,
			offset: page ? parseInt(page) : 1
		});

		return res
			.status(200)
			.json(
				responseFormatter.ResponseWithData({ status, message: msg, data, statusCode: 200 })
			);
	};


	updateAccount = async (req: IRequest, res: IResponse, next: INext) => {
		const { id } = req.params;
		const { status, data, msg } = await this.useCase.editUserProfile(
			id,
			req.body
		);

		return res.status(200).json(data);
	};


	updateProfilePic = async (req: IRequest, res: IResponse, next: INext) => {
		const { id } = req.params;
		const { status, data, msg } = await this.useCase.addNewUser(
			req.body
		);

		return res.status(200).json(data);
	};


	updatePassword = async (req: IRequest, res: IResponse, next: INext) => {
		const { id } = req.params;
		const { status, data, msg } = await this.useCase.addNewUser(
			req.body
		);

		return res.status(200).json(data);
	};
}

export default UserController;
