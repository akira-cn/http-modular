export default {
  getContext(params, context) {
    return context;
  },
  getUrl(params, context) {
    const {protocol, host, url} = context;
    return `${protocol}://${host}${url}`;
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