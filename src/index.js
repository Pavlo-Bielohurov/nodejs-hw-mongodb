import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

const booststrap = async () => {
  await initMongoConnection();
  setupServer();
};

booststrap();
