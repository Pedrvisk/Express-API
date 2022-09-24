## Express API
A NodeJS project using <strong>[Express](https://www.npmjs.com/package/express)</strong> with <strong>[Greenlock](https://www.npmjs.com/package/greenlock-express)</strong> (it's a web server with HTTPS and fully automated renewals), the project's main function is to act as an <strong>API</strong> for a website.

```js
npm install ?? yarn add (Recommended)
```

## Go to Dashboard.js
#### Usage
```js
new Express({
	greenlock: {
		enabled: false, // default: false
		packageRoot: __dirname, // default: __dirname
		configDir: resolve('src/config/greenlock'), // default: ./greenlock
		maintainerEmail: 'YOUR_EMAIL', // required!
		cluster: false, // default: false
	},
	api: {
		middlewares: resolve('src/middlewares'), // default: __dirname + '/middlewares'
		controllers: resolve('src/controllers'), // default: __dirname + '/controllers'
		plugins: resolve('src/plugins'), // default: __dirname + '/plugins'
		static: resolve('src/public'), // default: __dirname + '/public'
		basePath: '/api' // default: '/'
	}
}).start(3001);
```

#### Shorthands
|Shorthand|Module|Description|
|-|-|-|
|api.axios|[Axios](https://www.npmjs.com/package/axios)|Promise based HTTP client for the browser and node.js|
|api.express|[Express](https://www.npmjs.com/package/axios)|Fast, unopinionated, minimalist web framework for node.|
|api.app|[Application](http://expressjs.com/en/5x/api.html#app)|The app object conventionally denotes the Express application.|
|api.console|[Console](https://github.com/Pedrvisk/Express-API/blob/main/src/structures/Console.js)|Simple debug console with tags and colors.|
|api.options|[Options](https://github.com/Pedrvisk/Express-API/blob/main/Dashboard.js)|Express API options.|

#### Console Usage
```js
api.console.log('Heeellllooooooo!!!', ['SERVER']);

// With Color
// Available Colors: black, red, green, yellow, blue, magenta, cyan and white
api.console.log(api.console.yellow('Heeellllooooooo!!!'), ['SERVER']);
```

## LICENSE

This project is licensed under <strong>MIT</strong>, which basically means you can do anything you want with it, i only ask that you include a small copyright notice and a link to this repo in a comment in your source code.
