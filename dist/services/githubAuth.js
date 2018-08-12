'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CLIENT_ID = 'f5f40bab8debde6aeb24';
const CLIENT_SECRET = 'a947758277e4751eeaddad789ebad355516d4b9f';

class GithubAuth {
  authorizeUrl() {
    const urlObj = _url2.default.format({
      protocol: 'https',
      hostname: 'github.com',
      pathname: '/login/oauth/authorize',
      query: {
        client_id: CLIENT_ID,
        scope: 'repo'
      }
    });
    return urlObj.toString();
  }

  async accessToken(code) {
    const uri = 'https://github.com/login/oauth/access_token';
    const res = await _axios2.default.post(uri, {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code
    }, {
      headers: {
        Accept: 'application/json'
      }
    });
    return res.data.access_token;
  }
}

exports.default = new GithubAuth();