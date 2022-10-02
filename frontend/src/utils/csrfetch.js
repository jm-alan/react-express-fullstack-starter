import findCookie from './findCookie';
import getApp from './getApp';
import store from '../store';
import paramKVParser from './paramKVParser';
import { silenceAsync } from './silcenceErrors';
import { oops, setErrors } from '../store/errors';
import { showErrors } from '../store/UX';

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'XSRF-Token': findCookie('XSRF-TOKEN')
});

const getCredentials = () => process.env.NODE_ENV === 'development' ? 'include' : 'same-origin';

export default {
  async get (url, params) {
    return await this.__fetch_and_catch(url, { params });
  },
  async post (url, body) {
    return await this.__fetch_and_catch(url, { method: 'POST', body });
  },
  async patch (url, body) {
    return await this.__fetch_and_catch(url, { method: 'PATCH', body });
  },
  async delete (url, body) {
    return await this.__fetch_and_catch(url, { method: 'DELETE', body });
  },
  async restoreCSRF () {
    if (process.env.NODE_ENV === 'development') {
      await this.__fetch_and_catch('/api/csrf/restore');
    }
  },
  async __fetch_and_catch (url, { method, params, body } = {}) {
    url = `${getApp()}${url}`;
    body = JSON.stringify(body);
    if (params) {
      url += `?${paramKVParser(params)}`;
    }
    const res = await fetch(url, {
      method,
      body,
      headers: getHeaders(),
      credentials: getCredentials()
    });
    if (res.status.between(400, 499)) {
      const { errors } = await res.json();
      store.dispatch(setErrors([
        ...errors,
        'If you believe you\'re seeing this message in error, please refresh the page and try again'
      ]));
      store.dispatch(showErrors());
      return {};
    } else if (res.status >= 500) {
      store.dispatch(oops());
      store.dispatch(showErrors());
      return {};
    } else return await silenceAsync(async () => await res.json());
  }
};
