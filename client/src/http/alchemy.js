import rp from 'request-promise';
import Config from '../config';

class AlchemyHttpClient {
  constructor(API_TOKEN = '') {
    this.URL_BASE = Config.ALCHEMY_BASE_URL;
    this.API_TOKEN = API_TOKEN;
  }

  setOptions() {
    return {
      headers: { Authorization: `Bearer ${this.API_TOKEN}` },
      json: true,
    };
  }

  setNewToken(API_TOKEN) {
    this.API_TOKEN = API_TOKEN;
  }

  get(endpoint, qs = '') {
    return rp({
      ...this.setOptions(),
      uri: this.URL_BASE + endpoint,
      qs,
    });
  }

  post(endpoint, body) {
    return rp({
      ...this.setOptions(),
      method: 'POST',
      uri: this.URL_BASE + endpoint,
      body,
    });
  }

  put(endpoint, body) {
    return rp({
      ...this.options(),
      method: 'PUT',
      uri: this.URL_BASE + endpoint,
      body,
    });
  }
}

export default AlchemyHttpClient;
