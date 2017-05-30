import config from 'config';
import http from 'http';
import app from './router';

const server = http.createServer(app);
const PORT = config.get('port');

server.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
