# ES-Modular

A universal library for converting server-side functions into ES Modules.

<img src="https://aircode-yvo.b-cdn.net/resource/modules-9sfv4swzvco.svg" width="200">

**server:**

```js
// https://au215ybu51.us.aircode.run/index
import {config, modular} from 'es-modular';

function add(x, y) {
  return x + y;
}

function getUrl(context) {
  const {url} = context;
  return url;
}

export default modular({
  add,
  getUrl,
}, config.aircode);
```

**client**

```js
import {add, getUrl} from 'https://au215ybu51.us.aircode.run/index';

console.log(await add(1, 2)); // => 3
console.log(await getUrl()); // => /index
```

### Online demo

Server: https://github.com/AirCodeLabs/aircode/tree/main/examples/modular-demo

Client: https://codepen.io/akira-cn/pen/mdQYvmz

## Features

- 🧸 Tiny size and easy to use.
- 🌎 Works in any where, almost in all Node.js HTTP servers or cloud environments.

  ES-Modular inherently supports the following environments through corresponding configurations:

  - [x] [Express](https://expressjs.com/)
  - [x] [Koa](https://koajs.com/)
  - [x] [Fastify](https://fastify.dev/)
  - [x] [Nitro](https://nitro.unjs.io/)
  - [x] [Vercel](https://vercel.com/)
  - [x] [AirCode](https://aircode.io/)

- 🧩 Esay to extends.

  You can extend ES-Modular to other environments such as Deno, Edge Runtime, or Ben by creating your own configurations.

## Usage

1. Work with Koa:

```js
import Koa from "koa";
import { bodyParser } from "@koa/bodyparser";
import { modular, config } from 'es-modular';

function add(x, y) {
  return x + y;
}

function getHost($context) {
  return $context.request.hostname;
}

const app = new Koa();
app.use(bodyParser());

// response
app.use(modular({ add, getHost }, config.koa));

app.listen(3000);
```

2. Work with Express:

```js
import express from "express";
import bodyParser from 'body-parser';
import { modular, config } from 'es-modular';

const app = express();

app.use(bodyParser.json({
  limit: '4.5mb',
  type: '*/*',
}));

function add(x, y) {
  return x + y;
}

function getHost($context) {
  return $context.request.hostname;
}

function getMessage() {
  return {hi: 'there'};
}

app.all('/', modular({ add, getHost, getMessage }, config.express));

app.listen(3000);
```

3. Work with Fastify:

```js
import Fastify from 'fastify';
import { modular, config } from 'es-modular';

const fastify = Fastify({
  logger: true
});


function add(x, y) {
  return x + y;
}

function getHost($context) {
  return $context.request.hostname;
}

function getMessage() {
  return {hi: 'there'};
}

// Declare a route
fastify.all('/', modular({add, getHost, getMessage}, config.fastify));

// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  // Server is now listening on ${address}
});
```

4. Work with Nitro

```js
import { modular, config } from 'es-modular';

function add(x, y) {
  return x + y;
}

async function echo(...args) {
  const $context = args.pop();
  return await readBody($context);
}

function getMessage() {
  return {hi: 'there'};
}

export default eventHandler(
  modular({add, echo, getMessage}, config.nitro)
);
```

5. Work with Vercel api function:

```js
import { modular, config } from 'es-modular';

function add(x, y) {
  return x + y;
}

function echo($context) {
  return $context.request.body;
}

function getMessage() {
  return {hi: 'there'};
}

export default modular({add, echo, getMessage}, config.vercel);
```

6. Work with AirCode cloud function:

```js
import {config, modular} from 'es-modular';

function add(x, y) {
  return x + y;
}

function getUrl(context) {
  const {url} = context;
  return url;
}

export default modular({
  add,
  getUrl,
}, config.aircode);
```
