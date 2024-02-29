# Express API - TypeScript

A NodeJS project using <strong>[Express](https://www.npmjs.com/package/express)</strong> with **[TypeScript](https://www.typescriptlang.org/)**, the project's main function is to act as an <strong>API</strong> for a website.

```js
npm install
```

## Go to Dashboard.js

#### Usage

```js
new Express({
  folders: {
    middlewares: 'src/application/middlewares',
    services: 'src/application/services',
    controllers: 'src/application/controllers',
  },
  basePath: '/api', // default: '/'
}).start(3005);
```

#### Shorthands

| Shorthand    | Module                                                                                 | Description                                                    |
| ------------ | -------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| main.axios   | [Axios](https://www.npmjs.com/package/axios)                                           | Promise based HTTP client for the browser and node.js          |
| main.express | [Express](https://www.npmjs.com/package/axios)                                         | Fast, unopinionated, minimalist web framework for node.        |
| main.app     | [Application](http://expressjs.com/en/5x/api.html#app)                                 | The app object conventionally denotes the Express application. |
| main.console | [Console](https://github.com/Pedrvisk/Express-API/blob/main/src/structures/Console.js) | Simple debug console with tags and colors.                     |
| main.options | [Options](https://github.com/Pedrvisk/Express-API/blob/main/app.ts)                    | Express API options.                                           |

#### Console Usage

```js
main.console.log('Heeellllooooooo!!!', ['SERVER']);
```

## LICENSE

This project is licensed under <strong>MIT</strong>, which basically means you can do anything you want with it, i only ask that you include a small copyright notice and a link to this repo in a comment in your source code.
