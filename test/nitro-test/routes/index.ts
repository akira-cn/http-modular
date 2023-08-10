// export default eventHandler(async (event) => {
//   if(event.node.req.method === 'GET') {
//     console.log(event.node.res.setHeader);
//     return { nitro: 'Is Awesome!' }
//   }
//   console.log(await readBody(event));
//   return { nitro: 'Is Awesome!' }
// })
import { modular, config } from "es-modular";

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