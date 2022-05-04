/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUserConroller } from '@ostrich-domains/Users/interfaces/controller';
import IRequest from '@ostrich/src/common/interfaces/request';
import { IResponse } from '@ostrich/src/common/types';
import { IUserUseCases } from '../interfaces/useCase';

/**
 *
 * Brief description of the class here
 * @extends ParentClassNameHereIfAny
 * @implements {IUserController}
 */
class UserController implements IUserConroller {
	protected useCase: IUserUseCases;
	constructor(useCase: IUserUseCases) {
		this.useCase = useCase;
	}
	/**
	 * Brief description of the function here.
	 * @summary If the description is long, write your summary here. Otherwise, feel free to remove this.
	 * @param {ParamDataTypeHere} parameterNameHere - Brief description of the parameter here. Note: For other notations of data types, please refer to JSDocs: DataTypes command.
	 * @return {ReturnValueDataTypeHere} Brief description of the returning value here.
	 */
	softDeleteUser: (req: IRequest, res: IResponse) => Promise<any> =
		async function (req, res) {
			return res.status(300);
		};
	/**
	 * Brief description of the function here.
	 * @summary If the description is long, write your summary here. Otherwise, feel free to remove this.
	 * @param {ParamDataTypeHere} parameterNameHere - Brief description of the parameter here. Note: For other notations of data types, please refer to JSDocs: DataTypes command.
	 * @return {ReturnValueDataTypeHere} Brief description of the returning value here.
	 */
	deleteUser: () => Promise<any>;
	/**
	 * Brief description of the function here.
	 * @summary If the description is long, write your summary here. Otherwise, feel free to remove this.
	 * @param {ParamDataTypeHere} parameterNameHere - Brief description of the parameter here. Note: For other notations of data types, please refer to JSDocs: DataTypes command.
	 * @return {ReturnValueDataTypeHere} Brief description of the returning value here.
	 */
	findUserByEmail: () => Promise<any>;
	/**
	 * Brief description of the function here.
	 * @summary If the description is long, write your summary here. Otherwise, feel free to remove this.
	 * @param {ParamDataTypeHere} parameterNameHere - Brief description of the parameter here. Note: For other notations of data types, please refer to JSDocs: DataTypes command.
	 * @return {ReturnValueDataTypeHere} Brief description of the returning value here.
	 */
	findUserById: () => Promise<any>;
	/**
	 * Brief description of the function here.
	 * @summary If the description is long, write your summary here. Otherwise, feel free to remove this.
	 * @param {ParamDataTypeHere} parameterNameHere - Brief description of the parameter here. Note: For other notations of data types, please refer to JSDocs: DataTypes command.
	 * @return {ReturnValueDataTypeHere} Brief description of the returning value here.
	 */
	getAccountActivationLink: () => Promise<any>;
	/**
	 * Brief description of the function here.
	 * @summary If the description is long, write your summary here. Otherwise, feel free to remove this.
	 * @param {ParamDataTypeHere} parameterNameHere - Brief description of the parameter here. Note: For other notations of data types, please refer to JSDocs: DataTypes command.
	 * @return {ReturnValueDataTypeHere} Brief description of the returning value here.
	 */
	getPasswordResetLink: () => Promise<any>;
	/**
	 * Brief description of the function here.
	 * @summary If the description is long, write your summary here. Otherwise, feel free to remove this.
	 * @param {ParamDataTypeHere} parameterNameHere - Brief description of the parameter here. Note: For other notations of data types, please refer to JSDocs: DataTypes command.
	 * @return {ReturnValueDataTypeHere} Brief description of the returning value here.
	 */
	resetAccountPassword: () => Promise<any>;
	/**
	 * Brief description of the function here.
	 * @summary If the description is long, write your summary here. Otherwise, feel free to remove this.
	 * @param {ParamDataTypeHere} parameterNameHere - Brief description of the parameter here. Note: For other notations of data types, please refer to JSDocs: DataTypes command.
	 * @return {ReturnValueDataTypeHere} Brief description of the returning value here.
	 */
	activateAccount: () => Promise<any>;
	/**
	 * Brief description of the function here.
	 * @summary If the description is long, write your summary here. Otherwise, feel free to remove this.
	 * @param {ParamDataTypeHere} parameterNameHere - Brief description of the parameter here. Note: For other notations of data types, please refer to JSDocs: DataTypes command.
	 * @return {ReturnValueDataTypeHere} Brief description of the returning value here.
	 */
	findUsers: () => Promise<any>;
	/**
	 * Brief description of the function here.
	 * @summary If the description is long, write your summary here. Otherwise, feel free to remove this.
	 * @param {ParamDataTypeHere} parameterNameHere - Brief description of the parameter here. Note: For other notations of data types, please refer to JSDocs: DataTypes command.
	 * @return {ReturnValueDataTypeHere} Brief description of the returning value here.
	 */
	updateAccount: () => Promise<any>;
	/**
	 * Brief description of the function here.
	 * @summary If the description is long, write your summary here. Otherwise, feel free to remove this.
	 * @param {ParamDataTypeHere} parameterNameHere - Brief description of the parameter here. Note: For other notations of data types, please refer to JSDocs: DataTypes command.
	 * @return {ReturnValueDataTypeHere} Brief description of the returning value here.
	 */
	updatePassword: () => Promise<any>;
}

export default UserController;
