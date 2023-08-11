const sourePrefix = `
function makeRpc(url, func) {
  return async(...args) => {
    const ret = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({func, args}),
      headers: {
        'content-type': 'application/json'
      }
    });
    const type = ret.headers.get('content-type');
    if(type && type.startsWith('application/json')) {
      return await ret.json();
    } else if(type && type.startsWith('text/')) {
      return await ret.text();
    }
    return await ret.arrayBuffer();
  }
}
`;

function buildModule(rpcs, url) {
  let source = [sourePrefix];
  for(const key of Object.keys(rpcs)) {
    source.push(`export const ${key} = makeRpc('${url}', '${key}');`);
  }
  return source.join('\n');
}

const _ctx = Symbol('ctx');

export function context(checker, func) {
  if(!func) {
    func = checker;
    checker = ctx => ctx;
  }
  const ret = async (context, ...rest) => {
    const ctx = await checker(context);
    return await func(ctx, ...rest);
  };
  ret[_ctx] = true;

  return ret;
}

export function modular(rpcs, {getParams, getUrl, getContext, setContentType, setBody}) {
  return async function (...rest) {
    const ctx = getContext(...rest);
    const method = ctx.request?.method || ctx.req?.method;
    if(method === 'GET') {
      setContentType(...rest);
      return setBody(buildModule(rpcs, getUrl(...rest)), ...rest);
    } else {
      const {func, args = []} = await getParams(...rest);
      const f = rpcs[func];
      if(f?.[_ctx]) {
        return setBody(await f(ctx, ...args), ...rest);
      }
      return setBody(await f(...args), ...rest);
    }
  };
}

export default modular;