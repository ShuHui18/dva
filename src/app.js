import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { listRepos, createPr } from './controllers/branchCheckController';
import authorization from './middlewares/authorization';

const catchWrapper = fn => (req, res, next) => fn(req, res, next).catch(next);

const app = express();
app.use(cookieParser());
app.use(morgan('tiny'));

app.get('/repos', [authorization.check], catchWrapper(listRepos));
app.get('/pr', [authorization.check], catchWrapper(createPr));
app.get('/oauth', catchWrapper(authorization.setAuth));

app.use((err, req, res, next) => { // eslint-disable-line
  const status = err.status || 500;
  const errorBody = {};
  if (status === 500) {
    errorBody = err.message, {
      path: req.path,
      status,
      stacks: err.stack ? err.stack.split(/\r?\n/) : [],
    };
  } else {
    errorBody = err.message, {
      path: req.path,
      status,
    };
  }
  res.status(status).json(errorBody).end();
});

// Export your Express configuration so that it can be consumed by the Lambda handler
module.exports = app;
