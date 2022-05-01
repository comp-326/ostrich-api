import { ExpressError } from '@ostrich-common/errors/ExpressError';
import { JWTPayloadType } from '@ostrich-common/types';
import { environmentConfig } from '@ostrich-config';
import jwt from 'jsonwebtoken';
class VerifyUserJWT {
	verifyPasswordToken = async (token: string) => {
		try {
			const decoded = jwt.verify(token, environmentConfig.SECRET_KEY) as JWTPayloadType;
			return decoded.userId;
		} catch (error) {
			throw new ExpressError({
				data: {},
				message: error.message ? error.message : 'Unknown error occured',
				status: 'error',
				statusCode: 500
			});
		}
	};
	activateUserTokenDecode(token: string) {
		try {
			const decoded = jwt.verify(token, environmentConfig.SECRET_KEY) as JWTPayloadType;
			return decoded.userId;
		} catch (error) {
			throw new ExpressError({
				data: {},
				message: error.message ? error.message : 'Unknown error occured',
				status: 'error',
				statusCode: 500
			});
		}
	}
}

export default new VerifyUserJWT();
