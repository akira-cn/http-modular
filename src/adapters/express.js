export default {
  getContext(request, response) {
    return {request, response};
  },
  getUrl(request) {
    const hostname = request.headers.host;
    return `${request.protocol}://${hostname}${request.url}`;
  },
  getParams(request) {
    return request.body;
  },
  setContentType(request, response) {
    response.setHeader('content-type', 'text/javascript');
  },
  setBody(body, request, response) {
    if(typeof body === 'number') {
      response.send(200, body);
    } else {
      response.send(body);
    }
  }
};