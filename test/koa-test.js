import Koa from "koa";
import { bodyParser } from "@koa/bodyparser";
import { modular, config } from "../src/index.js";

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
