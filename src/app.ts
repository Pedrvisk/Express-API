import { config } from 'dotenv';
config();

import { Express } from './structure/Express';
import { resolve } from 'path';

const baseFolder =
  process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'
    ? 'src/'
    : 'dist/';

const Application = new Express({
  folders: {
    middlewares: resolve(`${baseFolder}application/middlewares`),
    services: resolve(`${baseFolder}application/services`),
    controllers: resolve(`${baseFolder}application/controllers`),
  },
});

Application.start(3005, 'localhost', {
  isTest: process.env.NODE_ENV === 'test',
});

export default Application.app;
