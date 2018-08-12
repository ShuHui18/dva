import express from 'express';
import cookieParser from 'cookie-parser';
import { listRepos, createPr } from './controllers/branchCheckController';
import authorization from './middlewares/authorization';

const app = express();
app.use(cookieParser());

app.get('/repos', [authorization.check], listRepos);
app.get('/pr', [authorization.check], createPr);
app.get('/oauth', authorization.setAuth);

// Export your Express configuration so that it can be consumed by the Lambda handler
module.exports = app;
