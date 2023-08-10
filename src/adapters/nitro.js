import {readBody} from 'h3';

export default {
  getContext(event) {
    return {request: event.node.req, response: event.node.res, ...event};
  },
  getUrl(event) {
    const request = event.node.req;
    const hostname = request.headers.host;
    return `${request.protocol}://${hostname}${request.url}`;
  },
  async getParams(event) {
    return await readBody(event);
  },
  setContentType(event) {
    event.node.res.setHeader('content-type', 'text/javascript');
  },
  setBody(body) {
    return body;
  }
};