import { ExpressApplication } from 'structure/types/express';
import { NextFunction, Request, Response } from 'express';

export default (main: ExpressApplication) =>
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(`User is Authenticated - IP: ${req?.ip}`);
    next();
  };
