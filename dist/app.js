'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _branchCheckController = require('./controllers/branchCheckController');

var _authorization = require('./middlewares/authorization');

var _authorization2 = _interopRequireDefault(_authorization);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();
app.use((0, _cookieParser2.default)());

app.get('/repos', [_authorization2.default.check], _branchCheckController.listRepos);
app.get('/pr', [_authorization2.default.check], _branchCheckController.createPr);
app.get('/oauth', _authorization2.default.setAuth);

// Export your Express configuration so that it can be consumed by the Lambda handler
module.exports = app;