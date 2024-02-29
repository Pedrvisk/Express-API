export class Console {
  log(message: any, tags?: string[]): void {
    if (process.env.NODE_ENV === 'test') return;

    return console.log(
      `[${new Date().toLocaleTimeString()}] ${
        tags && tags?.length > 0 ? tags?.map((tag) => `[${tag}]`).join(' ') : ''
      }`,
      message
    );
  }
}
