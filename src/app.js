const express = require('express');
const { loginRouter, userRouter, categoriesRouter } = require('./routers');

const app = express();

app.use(express.json());
app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/categories', categoriesRouter);

module.exports = app;
