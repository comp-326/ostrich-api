import path from 'path';
import { setEnvironmentVariables } from '@ostrich-app/utils/fileSystem';

// eslint-disable-next-line camelcase
const env_path = path.join(path.join(__dirname), '..', '.env.example');

const buildVariables = () => {
	setEnvironmentVariables(env_path);
};

buildVariables();
