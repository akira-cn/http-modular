import express from "express";
import bodyParser from 'body-parser';
import { modular, config } from "../src/index.js";

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