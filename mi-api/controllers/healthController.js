import { isDatabaseConnected } from '../config/database.js';

function healthCheck(req, res) {
  res.json({
    status: 'ok',
    db: isDatabaseConnected() ? 'connected' : 'disconnected'
  });
}

export {
  healthCheck
};