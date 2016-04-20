import libUrl from 'url';
import { reduce } from 'lodash';
import reducerFn from './reducerFn';
import actionFn from './actionFn';
import transformers from './transformers';
import async from './async';

const defaultEndpointConfig = {
  transformer: transformers.object
};

const PREFIX = '@@ao-api';

export default function aoApi(config) {
  const fetchHolder = {
    fetch: null,
    server: false,
    rootUrl: null,
    options: {}
  };

  const cfg = {
    use(key, value) {
      if (key === 'rootUrl') {
        value && (fetchHolder[key] = libUrl.parse(value));
      } else {
        fetchHolder[key] = value;
      }

      return this;
    },
    init(fetch, isServer=false, rootUrl) {
      /* eslint no-console: 0 */
      console.warn('Deprecated method, use `use` method');
      this.use('fetch', fetch);
      this.use('server', isServer);
      this.use('rootUrl', rootUrl);
      return this;
    },
    actions: {},
    reducers: {},
    events: {}
  };

  const aoApiObject = reduce(config, (memo, value, key)=> {
    const opts = typeof value === 'object' ?
      { ...defaultEndpointConfig, reducerName: key, ...value } :
      { ...defaultEndpointConfig, reducerName: key, url: value };

    const {
      url, options, transformer, broadcast,
      reducerName, prefetch, postfetch, validation, helpers
    } = opts;

    const ACTIONS = {
      actionFetch: `${PREFIX}@${reducerName}`,
      actionSuccess: `${PREFIX}@${reducerName}_success`,
      actionFail: `${PREFIX}@${reducerName}_fail`,
      actionReset: `${PREFIX}@${reducerName}_delete`
    };

    const meta = {
      fetch: opts.fetch ? opts.fetch : function() {
        return fetchHolder.fetch.apply(this, arguments);
      },
      holder: fetchHolder,
      broadcast,
      virtual: !!opts.virtual,
      actions: memo.actions,
      prefetch, postfetch, validation,
      helpers, transformer
    };

    memo.actions[key] = actionFn(url, key, options, ACTIONS, meta);

    if (!meta.virtual && !memo.reducers[reducerName]) {
      const initialState = {
        sync: false,
        syncing: false,
        loading: false,
        data: transformer()
      };
      memo.reducers[reducerName] = reducerFn(initialState, ACTIONS);
    }
    memo.events[reducerName] = ACTIONS;
    return memo;
  }, cfg);

  return aoApiObject;
}

aoApi.transformers = transformers;
aoApi.async = async;
