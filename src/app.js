// Dependancies
const bodyParser = require("body-parser");
const express = require('express');
const methodOverride = require("method-override");
const path = require("path");
const serverless = require('serverless-http');

const app = express();
const router = express.Router();

// Template Settings
app.set('view engine', 'ejs');
app.locals.rootPath = process.env.NODE_ENV === 'dev' ? '/app/' : '/';

// Middleware
app.use('/app/public', express.static(`${path.dirname(__dirname)}/dist/public/`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());
app.use(require('./middleware/prismic'));

// Routes
router.use(require('./routes/index'));

app.use(app.locals.rootPath, router);

module.exports.handler = serverless(app);
