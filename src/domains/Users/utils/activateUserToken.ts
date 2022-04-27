import { JWTPayloadType } from '@ostrich-common/types';
import { SECRET_KEY } from '@ostrich-config';
import jwt from 'jsonwebtoken';

export function activateUserTokenDecode(token: string) {
	const decoded = jwt.verify(token, SECRET_KEY) as JWTPayloadType;
	return decoded;
}
