import path from 'path';
import crypto from 'crypto';
import os from 'os';
import fs from 'fs';
import dirExistSync from '@ostrich-utils/fileSystem/dirExist';

function setEnvironmentVariables(envFilePath: string) {
	let filepath = '';
	const key = '';
	const value = '';
	try {
		filepath = path.join(path.dirname(envFilePath), '.env.example');
	} catch (err) {
		console.log('File does not exist');
		process.exit();
	}
	const data: { [x: string]: string } = {};
	fs.readFileSync(filepath, 'utf8')
		.split(os.EOL)
		.forEach(line => {
			const [k, v] = line.trim().split('=');
			if (key === k) {
				data[k] = value;
			} else {
				data[k] = v;
			}
		});

	data['PORT'] = '6200';
	data['SECRET_KEY'] = crypto.randomBytes(64).toString('hex');
	data['REFRESH_KEY'] = crypto.randomBytes(64).toString('hex');
	data['ENC_KEY'] = crypto.randomBytes(64).toString('hex');
	data['APP_NAME'] = 'ostrich';
	data['API_VERSION'] = '/api/v1';
	data['HOST'] = 'localhost';
	data['DATABASE_URL'] = `mongodb://localhost:27017/${data['APP_NAME']}-dev-db`;
	data[
		'TEST_DB_URL'
	] = `mongodb://localhost:27017/${data['APP_NAME']}-testing-dev-db`;

	const envExist = dirExistSync(path.join(path.dirname(envFilePath), '.env'));
	if (envExist) {
		fs.readFileSync(path.join(path.dirname(filepath), '.env'), 'utf8')
			.split(os.EOL)
			.forEach(line => {
				if (line !== '') {
					const [k, v] = line.trim().split('=');
					if (v !== '') {
						data[k] = v;
					}
					if (!Object.keys(data).includes(k)) {
						data[k] = v;
					}
				}
			});
	}
	const env = Object.entries(data).map(([key, value]) => {
		return `${key}=${value}`;
	});
	const sampleEnvBuffer = Object.entries(data).map(([key]) => {
		return `${key}=`;
	});
	fs.writeFileSync(
		path.join(path.dirname(envFilePath), '.env'),
		env.join(os.EOL),
		'utf8'
	);
	fs.writeFileSync(
		path.join(path.dirname(envFilePath), '.env.example'),
		sampleEnvBuffer.join(os.EOL),
		'utf8'
	);
}

export default setEnvironmentVariables;
