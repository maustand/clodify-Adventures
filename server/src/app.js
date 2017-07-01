import http from 'http';
import { env, port, ip } from './config';
import express from './services/express';
import api from './api';
import fs from 'fs';

const app = express(api);
const server = http.createServer(app);

fs.stat('storage/treeview.json', (err) => {
	if (err) {
		fs.mkdir('storage', () => {
			fs.writeFile('storage/treeview.json', JSON.stringify([]));
		});
	}
});

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
  });
});

export default app;
