import url from 'url';
import axios from 'axios';

const CLIENT_ID = 'f5f40bab8debde6aeb24';
const CLIENT_SECRET = 'a947758277e4751eeaddad789ebad355516d4b9f';

class GithubAuth {
  authorizeUrl() {
    const urlObj = url.format({
      protocol: 'https',
      hostname: 'github.com',
      pathname: '/login/oauth/authorize',
      query: {
        client_id: CLIENT_ID,
        scope: 'repo',
      },
    });
    return urlObj.toString();
  }

  async accessToken(code) {
    const uri = 'https://github.com/login/oauth/access_token';
    const res = await axios.post(uri, {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
    }, {
      headers: {
        Accept: 'application/json',
      },
    });
    return res.data.access_token;
  }
}

export default new GithubAuth();
