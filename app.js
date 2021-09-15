const express = require('express');
const path = require('path');
const http = require("http");
const cookieParser = require('cookie-parser');
const passport = require('./app/middleware');

const port = process.env.PORT || 8000;

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const indexRouter = require('./app/routes/index');
const authController = require('./app/controllers/auth');

app.post('/auth', authController.login);

app.use('/', passport.authenticateBearer, indexRouter);

app.use(function(req, res, next) {
    res.status(404).send({ error: 'Not found' })
});

app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500).send({ error: err.toString() });
    res.send('res', res.status);
});

server.listen(port, function () {
    console.log("App running on *: " + port);
});

module.exports = server;