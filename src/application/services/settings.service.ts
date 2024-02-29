import { ExpressApplication } from 'structure/types/express';

export default (main: ExpressApplication) => {
  main.app.disable('x-powered-by');
  main.app.use(main.express.json());
  main.app.use(main.express.urlencoded({ extended: false }));
};
