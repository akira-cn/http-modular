import {readBody} from 'h3';

export default {
  getContext(event) {
    return {request: event.node.req, response: event.node.res, ...event};
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