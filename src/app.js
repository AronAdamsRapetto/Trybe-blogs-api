require('express-async-errors');
const express = require('express');
const { loginRouter, userRouter, categoriesRouter, postRouter } = require('./routers');
const error = require('./middlewares/error.middleware');

const app = express();

app.use(express.json());
app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/categories', categoriesRouter);
app.use('/post', postRouter);

app.use(error);

module.exports = app;
