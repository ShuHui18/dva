'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _githubAuth = require('../services/githubAuth');

var _githubAuth2 = _interopRequireDefault(_githubAuth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Authorization {
  async check(req, res, next) {
    const accessToken = req.cookies.accessToken;
    if (accessToken) {
      req.user = { accessToken };
      next();
    } else {
      res.redirect(_githubAuth2.default.authorizeUrl());
    }
  }

  async setAuth(req, res) {
    const token = await _githubAuth2.default.accessToken(req.query.code);
    res.cookie('accessToken', token);
    res.redirect('/repos');
  }
}

exports.default = new Authorization();