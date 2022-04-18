require('module-alias/register');
import { PORT, DB_URL } from './config';
import app from './app';
import http from 'http';
import connectDB from './db';

connectDB({ DB_URL });
const server = http.createServer(app);

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
