import { ExpressApplication } from 'structure/types/express';
import { NextFunction, Request, Response } from 'express';
import { existsSync, readdirSync } from 'fs';
import responseTime from 'response-time';

export class Routers {
  main: ExpressApplication;

  constructor(main: ExpressApplication) {
    this.main = main;
  }

  async init(): Promise<boolean> {
    try {
      this.main.app.use(
        responseTime((req: Request, res: Response, time) => {
          this.main.console.log(
            `${req?.url} [${req?.ip}] - ${time?.toFixed(2)}ms`,
            [`${req?.method?.toUpperCase()} => ${res?.statusCode}`]
          );
        })
      );

      this.main.app.use((req: Request, res: Response, next: NextFunction) => {
        res.reply = (statusCode = 200, data = {}) => {
          return res.status(statusCode).json({
            statusCode: res?.statusCode || 200,
            statusText:
              res?.statusMessage || this.main.axios.HttpStatusCode[statusCode],
            data,
          });
        };

        next();
      });

      const controllers = await readdirSync(
        this.main.options.folders.controllers
      )
        .filter((file) => /\.*controller.(js|ts)$/.test(file))
        .map((file) => file.split('.')[0]);

      for (const controller of controllers) {
        const { default: routerFunction } = await import(
          `${this.main.options.folders.controllers}/${controller}.controller`
        );
        const routers = await routerFunction(this.main);

        for (const router of routers) {
          if (
            !['get', 'post', 'put', 'patch', 'delete'].includes(
              router.method.toLowerCase()
            )
          )
            throw new TypeError('Method not allowed');

          const basePath = this.main.options.basePath || '/';
          const routePath: string =
            controller === 'index'
              ? `${basePath && router?.path !== '/' ? '' : basePath}${
                  router?.path === '/' ? '' : router.path
                }`
              : `${basePath}${controller}${
                  router?.path === '/' ? '' : router.path
                }`;

          this.main.console.log(
            `${router.method.toUpperCase()} ${routePath} Loaded!`,
            ['ROUTER']
          );

          const middlewares = router?.middlewares
            ? await Promise.all(
                router.middlewares
                  .filter((middleware) => {
                    const middlewareFilterPath: string = `${this.main.options.folders.middlewares}/${middleware}.middleware`;
                    return (
                      existsSync(`${middlewareFilterPath}.js`) ||
                      existsSync(`${middlewareFilterPath}.ts`)
                    );
                  })
                  .map(async (middleware) => {
                    const middlewarePath: string = `${this.main.options.folders.middlewares}/${middleware}.middleware`;
                    const { default: middlewareFunction } = await import(
                      middlewarePath
                    );

                    return await middlewareFunction(this.main);
                  })
              )
            : [];

          this.main.app[router.method.toLowerCase()](
            routePath,
            middlewares,
            async (
              req: Request,
              res: Response,
              next: NextFunction
            ): Promise<void> => {
              try {
                return await router.execute(req, res, next);
              } catch (err) {
                next(err);
              }
            }
          );
        }
      }

      this.main.app.use(
        (err: Error, req: Request, res: Response, next: NextFunction) => {
          const statusCode =
            this.main.axios.HttpStatusCode[err?.message] || 500;
          return res.status(statusCode).json({
            statusCode,
            statusText:
              err?.message ||
              this.main.axios.HttpStatusCode[statusCode] ||
              'InternalServerError',
          });
        }
      );

      this.main.app.use((req: Request, res: Response, next: NextFunction) => {
        const statusCode = 404;
        return res.status(statusCode).json({
          statusCode,
          statusText:
            req.statusMessage || this.main.axios.HttpStatusCode[statusCode],
        });
      });

      return true;
    } catch (err: any) {
      this.main.console.log(err, ['ERROR']);
      return false;
    }
  }
}
