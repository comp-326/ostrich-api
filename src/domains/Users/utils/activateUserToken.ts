import { JWTPayloadType } from '@base/src/common/types';
import { SECRET_KEY } from '@base/src/config';
import jwt from 'jsonwebtoken';

export function activateUserTokenDecode(token: string) {
	const decoded = jwt.verify(token, SECRET_KEY) as JWTPayloadType;
	return decoded;
}
