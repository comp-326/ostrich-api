import { ExpressError } from '@base/src/common/errors/ExpressError';
import { JWTPayloadType } from '@base/src/common/types';
import { SECRET_KEY } from '@base/src/config';
import jwt from 'jsonwebtoken';
class VerifyUserJWT {
	verifyPasswordToken = async (token: string) => {
		try {
			const decoded = jwt.verify(token, SECRET_KEY) as JWTPayloadType;
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
			const decoded = jwt.verify(token, SECRET_KEY) as JWTPayloadType;
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
