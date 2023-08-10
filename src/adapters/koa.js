export default {
  getContext(ctx) {
    return ctx;
  },
  getUrl(ctx) {
    return `${ctx.request.protocol}://${ctx.request.host}${ctx.request.url}`;
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