import { PORT } from '@ostrich-config';
import app from '@ostrich-base/app';
import http from 'http';

const server = http.createServer(app);

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

