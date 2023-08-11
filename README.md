# HTTP-Modular

HTTP-Modular is a universal library for converting server-side functions into ES Modules.

<img src="https://aircode-yvo.b-cdn.net/resource/modules-9sfv4swzvco.svg" width="200">

**HTTP-Modular release the true potential power of BFF(Back end for FrontEnd).**

Gone are the days of cumbersome code like this:

```js
// server-side
app.post('/save', async (context) => {
  ......
  const data = await getData(context);
  const result = await db.save(data);
  context.body = result;
});
```

```js
// in browser
const res = await fetch('https://<server.url>:<port>/save', {
  method: 'POST',
  body: JSON.stringify(data),
  headers: {
    ...
  }
);
const result = await res.json();
```

Embrace the future of coding with modular capabilities:

```js
// server-side
...
async function save(data) {
  ......
  return await db.save(data);
}
app.all('/save', modular({save, list, delete}, config.koa));
```

```js
// in browser
import {save} from 'https://<server.url>:<port>/save';
const result = await save(data); // done!
```

### Explore the Online Demo

Server: Check out [the GitHub repository](https://github.com/AirCodeLabs/aircode/tree/main/examples/modular-demo
)

Client: Experiment with the library on [CodePen](https://codepen.io/akira-cn/pen/mdQYvmz)

## Features

- 🧸 Lightweight and user-friendly design.
- 🌎 Compatible everywhere: Supports a wide range of Node.js HTTP servers and cloud environments.

  HTTP-Modular seamlessly integrates with various environments using dedicated configurations for:
  
  - [x] [Express](https://expressjs.com/)
  - [x] [Koa](https://koajs.com/)
  - [x] [Fastify](https://fastify.dev/)
  - [x] [Nitro](https://nitro.unjs.io/)
  - [x] [Vercel](https://vercel.com/)
  - [x] [AirCode](https://aircode.io/)

- 🧩 Effortless extensibility.

  Extend HTTP-Modular to other environments like Deno, Edge Runtime, or Ben by crafting custom configurations.

## Quick Started

### 1. Integrating with Koa:

```js
import Koa from "koa";
import { bodyParser } from "@koa/bodyparser";
import { modular, config } from 'http-modular';

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

### 2. Integrating with Express:

```js
import express from "express";
import bodyParser from 'body-parser';
import { modular, config } from 'http-modular';

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

### 3. Integrating with Fastify:

```js
import Fastify from 'fastify';
import { modular, config } from 'http-modular';

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

### 4. Integrating with Nitro

```js
import { modular, config } from 'http-modular';

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

### 5. Integrating with Vercel API Functions:

```js
import { modular, config } from 'http-modular';

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

### 6. Integrating with AirCode Cloud Functions:

```js
import {config, modular} from 'http-modular';

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
