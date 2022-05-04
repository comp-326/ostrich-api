import { JWTPayloadType } from '@ostrich-app/common/types';
import { environmentConfig } from '@ostrich-app/config';
import jwt from 'jsonwebtoken';

export function activateUserTokenDecode(token: string){
	const decoded = jwt.verify(token, environmentConfig.SECRET_KEY) as JWTPayloadType;
	return decoded;
}
