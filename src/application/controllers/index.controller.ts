import { RouterPath, ExpressApplication } from 'structure/types/express';
import { Flags } from '../../helpers/Flags';

export default (main: ExpressApplication): RouterPath[] => [
  {
    path: '/',
    method: 'GET',
    async execute(req, res, next) {
      return res.reply(200, {
        message: 'API Online!',
      });
    },
  },
  {
    path: '/auth',
    method: 'GET',
    middlewares: ['isAuthenticated'],
    async execute(req, res, next) {
      return res.reply(200, {
        message: 'Success!',
      });
    },
  },
  {
    path: '/server-error',
    method: 'GET',
    async execute(req, res, next) {
      const isError: boolean = true;
      if (isError) throw new Error('ITS A ERRORRR!!!!');

      return res.reply(200, {
        message: 'Success!',
      });
    },
  },
  {
    path: '/auth-error',
    method: 'GET',
    async execute(req, res, next) {
      const isError: boolean = true;
      if (isError) throw new Error(Flags.STATUS[401]);

      return res.reply(200, {
        message: 'Success!',
      });
    },
  },
];
