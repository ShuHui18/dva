import githubAuth from '../services/githubAuth';

class Authorization {
  async check(req, res, next) {
    if (req.query.code){
      const accessToken = await githubAuth.accessToken(req.query.code);
      req.user = { accessToken };
      res.cookie('accessToken', accessToken);
      next();
    } else if (req.cookies.accessToken) {
      req.user = { accessToken: req.cookies.accessToken };
      next();
    } else {
      const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
      res.redirect(githubAuth.authorizeUrl(fullUrl));
    }
  }
}

export default new Authorization();
