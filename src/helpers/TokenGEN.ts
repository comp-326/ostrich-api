import { JWTPayloadType } from '@ostrich-common/types';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import {environmentConfig} from '@ostrich-config';

const { ENC_KEY, SECRET_KEY } = environmentConfig;

class TokenGEN {
	// constructor() {}

	public generateToken(payload: JWTPayloadType): string {
		const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '270h' });
		const encryptedToken = CryptoJS.AES.encrypt(token, ENC_KEY).toString();
		return encryptedToken;
	}

	public decodeToken(token: string): string {
		const decryptedToken = CryptoJS.AES.decrypt(token, ENC_KEY).toString(
			CryptoJS.enc.Utf8
		);

		return decryptedToken;
	}
}

export default new TokenGEN();
