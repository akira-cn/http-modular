export default {
  getContext(params, context) {
    return context;
  },
  getParams(params) {
    return params;
  },
  setContentType(params, context) {
    context.set('content-type', 'text/javascript');
  },
  setBody(body) {
    return body;
  }
};