import type { Request, Response, NextFunction } from 'express';
import type { Express } from 'structure/Express';

interface RouterPath {
  path: string;
  method: 'GET' | 'PUT' | 'POST' | 'PATCH' | 'DELETE';
  middlewares?: string[];
  execute(req: Request, res: Response, next: NextFunction): void;
}

interface ExpressApplication extends Express {}

interface ExpressOptions {
  folders: {
    middlewares?: string;
    controllers?: string;
    services?: string;
  };
  basePath?: string;
}

interface Middleware {
  err?: Error;
  req: Request;
  res: Response;
  next: NextFunction;
}

export { RouterPath, Middleware, ExpressApplication, ExpressOptions };
