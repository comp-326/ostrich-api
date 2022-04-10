require('module-alias/register');
import { PORT, DB_URL } from '@root/config';
import app from '@root/app';
import http from 'http';
import connectDB from '@root/db';

connectDB({ DB_URL });
const server = http.createServer(app);

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
