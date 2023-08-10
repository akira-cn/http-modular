export default {
  getContext(ctx) {
    return ctx;
  },
  getParams(ctx) {
    return ctx.request.body;
  },
  setContentType(ctx) {
    ctx.set('content-type', 'text/javascript');
  },
  setBody(body, ctx) {
    ctx.body = body;
  }
};