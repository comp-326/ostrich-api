require('module-alias/register');
import { PORT } from './config';
import app from './app';
import http from 'http';

const server = http.createServer(app);

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
