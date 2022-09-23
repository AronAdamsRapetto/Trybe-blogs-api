const express = require('express');
const { routerLogin } = require('./routers');

const app = express();

app.use(express.json());
app.use('/login', routerLogin);

module.exports = app;
