import moment from 'moment';
import { environmentConfig } from '@ostrich-config';
import app from '@ostrich-base/app';
import http from 'http';

const server = http.createServer(app);

server.listen(environmentConfig.PORT, () => {
	const time = moment((new Date().getTime())).format('LLLL');
	const connectionString = `Server started on ${time} and running running on http://localhost:${environmentConfig.PORT}`;
	console.log(connectionString);
});

