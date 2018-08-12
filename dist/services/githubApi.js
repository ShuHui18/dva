'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const GITHUB_API_URL = 'https://api.github.com/';

class GithubApi {
  constructor() {
    this.githubApiUrl = GITHUB_API_URL;
  }
  async fetchBranchInfo(owner, repoName, branch, accessToken) {
    const uri = `${this.githubApiUrl}repos/${owner}/${repoName}/branches/${branch}`;
    const { data } = await _axios2.default.get(uri, {
      params: {
        access_token: accessToken
      }
    });
    return {
      sha: data.commit.sha,
      date: data.commit.commit.committer.date
    };
  }

  async fetchBranchCommit(owner, repoName, branch, since, accessToken) {
    const uri = `${this.githubApiUrl}repos/${owner}/${repoName}/commits`;
    return _axios2.default.get(uri, {
      params: {
        sha: branch,
        access_token: accessToken,
        since
      }
    });
  }

  async createPR(owner, repoName, accessToken) {
    const uri = `${this.githubApiUrl}repos/${owner}/${repoName}/pulls`;
    return _axios2.default.post(uri, {
      title: 'release to master',
      head: 'develop',
      base: 'master'
    }, {
      params: {
        access_token: accessToken
      }
    });
  }
}

exports.default = new GithubApi();