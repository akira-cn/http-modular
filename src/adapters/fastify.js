export default {
  getContext(request, reply) {
    return {request, reply};
  },
  getParams(request) {
    return request.body;
  },
  setContentType(request, reply) {
    reply.header('content-type', 'text/javascript');
  },
  setBody(body, request, reply) {
    reply.send(body);
  }
};