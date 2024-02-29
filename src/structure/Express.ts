import { ExpressOptions } from 'structure/types/express';
import express, { Application } from 'express';
import axios from 'axios';

import { Services } from './Services';
import { Console } from './Console';
import { Routers } from './Routers';

export class Express {
  options: ExpressOptions;

  app: Application = express();
  express = express;
  axios = axios;

  console = new Console();
  services = new Services(this);
  routers = new Routers(this);

  constructor(options?: ExpressOptions) {
    this.options = options;
  }

  async start(
    port: number,
    hostname?: string,
    options?: { isTest: boolean }
  ): Promise<boolean> {
    try {
      if (!port || isNaN(port)) port = 3001;
      if (!hostname) hostname = 'localhost';

      if (this.options.folders.services) await this.services.init();
      if (this.options.folders.controllers) await this.routers.init();

      if (!options?.isTest) {
        await this.app.listen(port, () =>
          this.console.log(`API: http://${hostname}:${port}`, ['SERVER'])
        );
      }

      return true;
    } catch (err: any) {
      this.console.log(err, ['ERROR']);
      return false;
    }
  }
}
