import { JWTPayloadType } from '@ostrich-common/types';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import {environmentConfig} from '@ostrich-config';

class TokenGEN {
	// constructor() {}

	public generateToken(payload: JWTPayloadType): string {
		const token = jwt.sign(payload, environmentConfig.SECRET_KEY, { expiresIn: '270h' });
		const encryptedToken = CryptoJS.AES.encrypt(token, environmentConfig.ENC_KEY).toString();
		return encryptedToken;
	}

	public decodeToken(token: string): string {
		const decryptedToken = CryptoJS.AES.decrypt(token, environmentConfig.ENC_KEY).toString(
			CryptoJS.enc.Utf8
		);

		return decryptedToken;
	}
}

export default new TokenGEN();
