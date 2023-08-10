export default {
  getContext(request, reply) {
    return {request, reply};
  },
  getUrl(request) {
    const hostname = request.headers.host;
    return `${request.protocol}://${hostname}${request.url}`;
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