import superagent from 'superagent';

export default function() {
  return function(url, opts) {
    let method = (opts.method || 'get');
    if (opts.body) {
      method = 'post';
    }
    
    let request = superagent[method.toLowerCase()](url);
    for (const key in (opts.headers || {})) {
      request = request.set(key, opts.headers[key]);
    }

    if (opts.body) {
      request = request.send(opts.body);
    }

    return new Promise((resolve, reject) => {
      request.end((error, res) => {
        error ? reject((res || {}).body || error) : resolve((res || {}).body);
      });
    });
  };
}