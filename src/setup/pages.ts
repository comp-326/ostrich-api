import { Application } from 'express';
import path from 'path';
import { BASE_DIR, environmentConfig } from '@ostrich-config';

export default function ({app}:{app: Application}) {
	app.set('view engine', 'ejs');
	app.set('views', path.join(BASE_DIR, 'views'));
	app.get('/', (re, res) => {
		res.render('index', { data:{port: environmentConfig.PORT, appName: environmentConfig.APP_NAME }});
	});
}
