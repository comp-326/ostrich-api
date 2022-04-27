import { BASE_DIR, NODE_ENV } from '@ostrich-config';
import path from 'path';
import swaggerUI from 'swagger-ui-express';
import yaml from 'yamljs';

const swaggerDocument =
	NODE_ENV === 'development'
		? yaml.load(path.join(BASE_DIR, 'swagger-docs/api.yml'))
		: null;

const options = {
	explorer: true,
	customSiteTitle: 'Ostrich app API',
};

const SwaggerSetup = swaggerUI.setup(swaggerDocument, options);
const swaggerServe = swaggerUI.serve;

export default Object.freeze({ swaggerServe, SwaggerSetup });
export { swaggerServe, SwaggerSetup };
