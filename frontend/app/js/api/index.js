import { omit } from 'lodash';
import aoApi, { transformers } from '../redux';
import adapterFetch from '../redux/adapters/fetch';
import Cookies from 'cookies-js';
import { browserHistory } from 'react-router';

const customHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'x-csrf-token': Cookies.get('XSRF-TOKEN'),
  'x-bonvoyage-auth': Cookies.get('x-bonvoyage-auth')
};

const api = aoApi({
  user: {
    url: `/api/v1/refresh-token`,
    options: {
      headers: omit(customHeaders, 'x-bonvoyage-auth'),
      method: 'get'
    }
  },
  login: {
    url: `/api/auth/login`,
    postfetch: [
      function({data, actions, dispatch, getState}) {
        if (Object.keys(data).length > 0) {
          Cookies.set('x-slb-auth', JSON.stringify({hello: 'world'}));
          browserHistory.push('/home');
        }
      }
    ],
    options: {
      method: 'post',
      headers: customHeaders
    }
  },
  logout: {
    url: `/api/v1/logout`,
    postfetch: [
      function({data, actions, dispatch, getState}) {
        Cookies.expire('x-slb-auth');
      }
    ],
    options: {
      method: 'post',
      headers: customHeaders
    }
  },
  apps: {
    url: `/api/v1/apps`,
    options: {
      headers: customHeaders
    }
  }
});

api.use('fetch', adapterFetch());
api.use('server', false);
api.use('rootUrl', 'https://' + document.location.hostname + ':' + document.location.port);

export default api;
