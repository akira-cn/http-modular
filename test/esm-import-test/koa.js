import Koa from "koa";
import { bodyParser } from "@koa/bodyparser";
import { modular, config } from "../../src/index.js";

const app = new Koa();
app.use(bodyParser());

const module = await import('./test-module.js');
app.use(modular(module, config.koa));

app.listen(3000);