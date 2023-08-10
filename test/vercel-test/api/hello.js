import { modular, config } from "../../../src/index.js";

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
