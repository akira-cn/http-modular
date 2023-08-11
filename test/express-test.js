import express from "express";
import bodyParser from 'body-parser';
import { modular, context, config } from "../src/index.js";

const app = express();

app.use(bodyParser.json({
  limit: '4.5mb',
  type: '*/*',
}));

function add(x, y) {
  return x + y;
}

const getHost = context((ctx) => ctx.request.hostname);

function getMessage() {
  return {hi: 'there'};
}

app.all('/', modular({ add, getHost, getMessage }, config.express));

app.listen(3000);