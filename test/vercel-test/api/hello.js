import { modular, context, config } from "../../../src/index.js";

function add(x, y) {
  return x + y;
}

const echo = context((ctx) => ctx.request.body);

function getMessage() {
  return {hi: 'there'};
}

export default modular({add, echo, getMessage}, config.vercel);
