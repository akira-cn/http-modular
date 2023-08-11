var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.js
var src_exports = {};
__export(src_exports, {
  config: () => adapters,
  context: () => context,
  modular: () => modular
});
module.exports = __toCommonJS(src_exports);

// src/adapters/aircode.js
var aircode_default = {
  getContext(params, context2) {
    return context2;
  },
  getUrl(params, context2) {
    const { protocol, host, url } = context2;
    return `${protocol}://${host}${url}`;
  },
  getParams(params) {
    return params;
  },
  setContentType(params, context2) {
    context2.set("content-type", "text/javascript");
  },
  setBody(body) {
    return body;
  }
};

// src/adapters/express.js
var express_default = {
  getContext(request, response) {
    return { request, response };
  },
  getUrl(request) {
    const hostname = request.headers.host;
    return `${request.protocol}://${hostname}${request.url}`;
  },
  getParams(request) {
    return request.body;
  },
  setContentType(request, response) {
    response.setHeader("content-type", "text/javascript");
  },
  setBody(body, request, response) {
    if (typeof body === "number") {
      response.send(200, body);
    } else {
      response.send(body);
    }
  }
};

// src/adapters/koa.js
var koa_default = {
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
    ctx.set("content-type", "text/javascript");
  },
  setBody(body, ctx) {
    ctx.body = body;
  }
};

// src/adapters/fastify.js
var fastify_default = {
  getContext(request, reply) {
    return { request, reply };
  },
  getUrl(request) {
    const hostname = request.headers.host;
    return `${request.protocol}://${hostname}${request.url}`;
  },
  getParams(request) {
    return request.body;
  },
  setContentType(request, reply) {
    reply.header("content-type", "text/javascript");
  },
  setBody(body, request, reply) {
    reply.send(body);
  }
};

// src/adapters/vercel.js
var vercel_default = {
  getContext(request, response) {
    return { request, response };
  },
  getUrl(request) {
    const hostname = request.headers.host;
    return `//${hostname}${request.url}`;
  },
  getParams(request) {
    return request.body;
  },
  setContentType(request, response) {
    response.setHeader("content-type", "text/javascript");
  },
  setBody(body, request, response) {
    response.send(body);
  }
};

// node_modules/destr/dist/index.mjs
var suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
var suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
var JsonSigRx = /^\s*["[{]|^\s*-?\d[\d.]{0,14}\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  const _value = value.trim();
  if (value[0] === '"' && value[value.length - 1] === '"') {
    return _value.slice(1, -1);
  }
  if (_value.length <= 9) {
    const _lval = _value.toLowerCase();
    if (_lval === "true") {
      return true;
    }
    if (_lval === "false") {
      return false;
    }
    if (_lval === "undefined") {
      return void 0;
    }
    if (_lval === "null") {
      return null;
    }
    if (_lval === "nan") {
      return Number.NaN;
    }
    if (_lval === "infinity") {
      return Number.POSITIVE_INFINITY;
    }
    if (_lval === "-infinity") {
      return Number.NEGATIVE_INFINITY;
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

// node_modules/defu/dist/defu.mjs
function isObject(value) {
  return value !== null && typeof value === "object";
}
function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isObject(value) && isObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
var defu = createDefu();
var defuFn = createDefu((object, key, currentValue) => {
  if (typeof object[key] !== "undefined" && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});
var defuArrayFn = createDefu((object, key, currentValue) => {
  if (Array.isArray(object[key]) && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});

// node_modules/h3/dist/index.mjs
var H3Error = class extends Error {
  constructor() {
    super(...arguments);
    this.statusCode = 500;
    this.fatal = false;
    this.unhandled = false;
  }
  toJSON() {
    const obj = {
      message: this.message,
      statusCode: sanitizeStatusCode(this.statusCode, 500)
    };
    if (this.statusMessage) {
      obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
    }
    if (this.data !== void 0) {
      obj.data = this.data;
    }
    return obj;
  }
};
H3Error.__h3_error__ = true;
function createError(input) {
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error(
    input.message ?? input.statusMessage ?? "",
    // @ts-ignore https://v8.dev/features/error-cause
    input.cause ? { cause: input.cause } : void 0
  );
  if ("stack" in input) {
    try {
      Object.defineProperty(err, "stack", {
        get() {
          return input.stack;
        }
      });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.statusCode) {
    err.statusCode = sanitizeStatusCode(input.statusCode, err.statusCode);
  } else if (input.status) {
    err.statusCode = sanitizeStatusCode(input.status, err.statusCode);
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  } else if (input.statusText) {
    err.statusMessage = input.statusText;
  }
  if (err.statusMessage) {
    const originalMessage = err.statusMessage;
    const sanitizedMessage = sanitizeStatusMessage(err.statusMessage);
    if (sanitizedMessage !== originalMessage) {
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default."
      );
    }
  }
  if (input.fatal !== void 0) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== void 0) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function isError(input) {
  return input?.constructor?.__h3_error__ === true;
}
function getMethod(event, defaultMethod = "GET") {
  return (event.node.req.method || defaultMethod).toUpperCase();
}
function isMethod(event, expected, allowHead) {
  const method = getMethod(event);
  if (allowHead && method === "HEAD") {
    return true;
  }
  if (typeof expected === "string") {
    if (method === expected) {
      return true;
    }
  } else if (expected.includes(method)) {
    return true;
  }
  return false;
}
function assertMethod(event, expected, allowHead) {
  if (!isMethod(event, expected, allowHead)) {
    throw createError({
      statusCode: 405,
      statusMessage: "HTTP method is not allowed."
    });
  }
}
var RawBodySymbol = Symbol.for("h3RawBody");
var ParsedBodySymbol = Symbol.for("h3ParsedBody");
var PayloadMethods$1 = ["PATCH", "POST", "PUT", "DELETE"];
function readRawBody(event, encoding = "utf8") {
  assertMethod(event, PayloadMethods$1);
  const _rawBody = event.node.req[RawBodySymbol] || event.node.req.body;
  if (_rawBody) {
    const promise2 = Promise.resolve(_rawBody).then((_resolved) => {
      if (Buffer.isBuffer(_resolved)) {
        return _resolved;
      }
      if (_resolved.constructor === Object) {
        return Buffer.from(JSON.stringify(_resolved));
      }
      return Buffer.from(_resolved);
    });
    return encoding ? promise2.then((buff) => buff.toString(encoding)) : promise2;
  }
  if (!Number.parseInt(event.node.req.headers["content-length"] || "")) {
    return Promise.resolve(void 0);
  }
  const promise = event.node.req[RawBodySymbol] = new Promise(
    (resolve, reject) => {
      const bodyData = [];
      event.node.req.on("error", (err) => {
        reject(err);
      }).on("data", (chunk) => {
        bodyData.push(chunk);
      }).on("end", () => {
        resolve(Buffer.concat(bodyData));
      });
    }
  );
  const result = encoding ? promise.then((buff) => buff.toString(encoding)) : promise;
  return result;
}
async function readBody(event) {
  if (ParsedBodySymbol in event.node.req) {
    return event.node.req[ParsedBodySymbol];
  }
  const body = await readRawBody(event, "utf8");
  if (event.node.req.headers["content-type"] === "application/x-www-form-urlencoded") {
    const form = new URLSearchParams(body);
    const parsedForm = /* @__PURE__ */ Object.create(null);
    for (const [key, value] of form.entries()) {
      if (key in parsedForm) {
        if (!Array.isArray(parsedForm[key])) {
          parsedForm[key] = [parsedForm[key]];
        }
        parsedForm[key].push(value);
      } else {
        parsedForm[key] = value;
      }
    }
    return parsedForm;
  }
  const json = destr(body);
  event.node.req[ParsedBodySymbol] = json;
  return json;
}
var DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) {
    return defaultStatusCode;
  }
  if (typeof statusCode === "string") {
    statusCode = Number.parseInt(statusCode, 10);
  }
  if (statusCode < 100 || statusCode > 999) {
    return defaultStatusCode;
  }
  return statusCode;
}
var H3Headers = class {
  constructor(init) {
    if (!init) {
      this._headers = {};
    } else if (Array.isArray(init)) {
      this._headers = Object.fromEntries(
        init.map(([key, value]) => [key.toLowerCase(), value])
      );
    } else if (init && "append" in init) {
      this._headers = Object.fromEntries(init.entries());
    } else {
      this._headers = Object.fromEntries(
        Object.entries(init).map(([key, value]) => [key.toLowerCase(), value])
      );
    }
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  entries() {
    throw Object.entries(this._headers)[Symbol.iterator]();
  }
  keys() {
    return Object.keys(this._headers)[Symbol.iterator]();
  }
  values() {
    throw Object.values(this._headers)[Symbol.iterator]();
  }
  append(name, value) {
    const _name = name.toLowerCase();
    this.set(_name, [this.get(_name), value].filter(Boolean).join(", "));
  }
  delete(name) {
    delete this._headers[name.toLowerCase()];
  }
  get(name) {
    return this._headers[name.toLowerCase()];
  }
  has(name) {
    return name.toLowerCase() in this._headers;
  }
  set(name, value) {
    this._headers[name.toLowerCase()] = String(value);
  }
  forEach(callbackfn) {
    for (const [key, value] of Object.entries(this._headers)) {
      callbackfn(value, key, this);
    }
  }
};

// src/adapters/nitro.js
var nitro_default = {
  getContext(event) {
    return { request: event.node.req, response: event.node.res, ...event };
  },
  getUrl(event) {
    const request = event.node.req;
    const hostname = request.headers.host;
    return `//${hostname}${request.url}`;
  },
  async getParams(event) {
    return await readBody(event);
  },
  setContentType(event) {
    event.node.res.setHeader("content-type", "text/javascript");
  },
  setBody(body) {
    return body;
  }
};

// src/adapters/index.js
var adapters = {
  aircode: aircode_default,
  express: express_default,
  koa: koa_default,
  fastify: fastify_default,
  vercel: vercel_default,
  nitro: nitro_default
};

// src/modular.js
var sourePrefix = `
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
  for (const key of Object.keys(rpcs)) {
    source.push(`export const ${key} = makeRpc('${url}', '${key}');`);
  }
  return source.join("\n");
}
var _ctx = Symbol("ctx");
function context(checker, func) {
  if (!func) {
    func = checker;
    checker = (ctx) => ctx;
  }
  const ret = async (context2, ...rest) => {
    const ctx = await checker(context2);
    return await func(ctx, ...rest);
  };
  ret[_ctx] = true;
  return ret;
}
function modular(rpcs, { getParams, getUrl, getContext, setContentType, setBody }) {
  return async function(...rest) {
    const ctx = getContext(...rest);
    const method = ctx.request?.method || ctx.req?.method;
    if (method === "GET") {
      setContentType(...rest);
      return setBody(buildModule(rpcs, getUrl(...rest)), ...rest);
    } else {
      const { func, args = [] } = await getParams(...rest);
      const f = rpcs[func];
      if (f?.[_ctx]) {
        return setBody(await f(ctx, ...args), ...rest);
      }
      return setBody(await f(...args), ...rest);
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  config,
  context,
  modular
});
