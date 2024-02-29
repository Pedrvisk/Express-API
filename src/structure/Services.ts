import { ExpressApplication } from 'structure/types/express';
import { readdirSync } from 'fs';

export class Services {
  main: ExpressApplication;

  constructor(main: ExpressApplication) {
    this.main = main;
  }

  async init(): Promise<boolean> {
    try {
      const services = await readdirSync(
        this.main.options.folders.services
      ).filter((file) =>
        process.env.NODE_ENV === 'development' ||
        process.env.NODE_ENV === 'test'
          ? /.service*\.ts$/.test(file)
          : /.service*\.js$/.test(file)
      );

      for (const service of services) {
        const { default: pluginData } = await import(
          `${this.main.options.folders.services}/${service}`
        );

        pluginData(this.main);
        this.main.console.log(`${service.split('.')[0]} Loaded!`, ['SERVICE']);
      }

      return true;
    } catch (err: any) {
      this.main.console.log(err, ['ERROR']);
      return false;
    }
  }
}
