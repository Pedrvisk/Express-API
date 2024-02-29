declare global {
  namespace Express {
    interface Response {
      reply(statusCode: number, data: object): void;
    }
  }
}

export {};
