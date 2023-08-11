import Fastify from 'fastify';
import { modular, context, config } from "../src/index.js";

const fastify = Fastify({
  logger: true
});


function add(x, y) {
  return x + y;
}

const getHost = context((ctx) => ctx.request.hostname);

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