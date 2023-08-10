export default {
  getContext(request, response) {
    return {request, response};
  },
  getParams(request) {
    return request.body;
  },
  setContentType(request, response) {
    response.setHeader('content-type', 'text/javascript');
  },
  setBody(body, request, response) {
    response.send(body);
  }
};