require('module-alias/register');
import path from 'path';
import { setEnvironmentVariables } from './utils/fileSystem';

const env_path = path.join(path.join(__dirname), '..', '.env.example');

const buildVariables = () => {
	setEnvironmentVariables(env_path);
};

buildVariables();
