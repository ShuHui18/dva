'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPr = exports.listRepos = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _githubApi = require('../services/githubApi');

var _githubApi2 = _interopRequireDefault(_githubApi);

var _templateHelper = require('../helpers/templateHelper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const gitRepos = _jsYaml2.default.safeLoad(_fs2.default.readFileSync(`${__dirname}/../../public/gitRepos.yml`, 'utf8'));

function getExpiredTime(date1, date2) {
  const diffTime = Date.parse(date1) - Date.parse(date2);
  const duration = _moment2.default.duration(diffTime);
  return `${Math.floor(duration.asDays())}d/${Math.floor(duration.asHours() % 24)}h`;
}

function hasSha(commits, sha) {
  return commits.data.size !== 0 && commits.data.find(commit => commit.sha === sha) !== undefined;
}

async function repoReport(repo, accessToken) {
  const [developInfo, masterInfo] = await Promise.all([_githubApi2.default.fetchBranchInfo(repo.owner, repo.repoName, 'develop', accessToken), _githubApi2.default.fetchBranchInfo(repo.owner, repo.repoName, 'master', accessToken)]);
  const masterCommits = await _githubApi2.default.fetchBranchCommit(repo.owner, repo.repoName, 'master', developInfo.date, accessToken);
  let prUrl;
  let expiredTime;
  let upToDate = true;
  if (!hasSha(masterCommits, developInfo.sha)) {
    expiredTime = getExpiredTime(developInfo.date, masterInfo.date);
    prUrl = `/pr?owner=${repo.owner}&repoName=${repo.repoName}`;
    upToDate = false;
  }
  return {
    name: repo.repoName,
    upToDate,
    expiredTime,
    prUrl
  };
}

async function listRepos(req, res) {
  const accessToken = req.user.accessToken;
  const gitReposInfo = await Promise.all(gitRepos.map(repo => repoReport(repo, accessToken)));
  const contents = await (0, _templateHelper.renderTemplate)('repoList', { repos: gitReposInfo });
  res.send(contents);
}

async function createPr(req, res) {
  const { owner, repoName } = req.query;
  const accessToken = req.user.accessToken;
  const prRes = await _githubApi2.default.createPR(owner, repoName, accessToken);
  res.redirect(prRes.data.html_url);
}

exports.listRepos = listRepos;
exports.createPr = createPr;