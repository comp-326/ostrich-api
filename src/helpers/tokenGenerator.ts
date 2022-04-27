import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '@ostrich-config';
class GenerateJWTTokens {
	generatePasswordResetToken = function ({ userId }: { userId: string }) {
		return function generate(duration = '') {
			const token = jwt.sign({ userId }, SECRET_KEY, {
				expiresIn: duration ? duration : '24h'
			});
			return token;
		};
	};

	generateEmailActivationToken = function ({ userId }: { userId: string }) {
		return function generate(duration = '') {
			const token = jwt.sign({ userId }, SECRET_KEY, {
				expiresIn: duration ? duration : '24h'
			});
			return token;
		};
	};

	generateAuthToken = function ({
		email,
		userId
	}: {
		email: string;
		userId: string;
	}) {
		return function generate(duration = '') {
			const token = jwt.sign({ email, userId }, SECRET_KEY, {
				expiresIn: duration ? duration : '24h'
			});
			return token;
		};
	};
}

export default new GenerateJWTTokens();
