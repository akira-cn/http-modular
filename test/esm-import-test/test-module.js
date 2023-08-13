import { context } from "../../src/index.js";

export function add(x, y) {
  return x + y;
}

export const getHost = context((ctx) => ctx.request.hostname);
