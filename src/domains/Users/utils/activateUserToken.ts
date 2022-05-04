import { JWTPayloadType } from '@ostrich-common/types';
import { environmentConfig } from '@ostrich-config';
import jwt from 'jsonwebtoken';

export function activateUserTokenDecode(token: string){
	const decoded = jwt.verify(token, environmentConfig.SECRET_KEY) as JWTPayloadType;
	return decoded;
}
