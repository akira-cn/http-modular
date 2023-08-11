// export default eventHandler(async (event) => {
//   if(event.node.req.method === 'GET') {
//     console.log(event.node.res.setHeader);
//     return { nitro: 'Is Awesome!' }
//   }
//   console.log(await readBody(event));
//   return { nitro: 'Is Awesome!' }
// })
import { modular, context, config } from "es-modular";

function add(x, y) {
  return x + y;
}

const echo = context(async (ctx) => {
  return await readBody(ctx);
});

function getMessage() {
  return {hi: 'there'};
}

export default eventHandler(
  modular({add, echo, getMessage}, config.nitro)
);