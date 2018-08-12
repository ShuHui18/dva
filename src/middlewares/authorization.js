import githubAuth from '../services/githubAuth';

class Authorization {
  async check(req, res, next) {
    const accessToken = req.cookies.accessToken;
    if (accessToken) {
      req.user = { accessToken };
      next();
    } else {
      res.redirect(githubAuth.authorizeUrl());
    }
  }

  async setAuth(req, res) {
    const token = await githubAuth.accessToken(req.query.code);
    res.cookie('accessToken', token);
    res.redirect('/repos');
  }
}

export default new Authorization();
