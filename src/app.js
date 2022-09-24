const express = require('express');
const { loginRouter, userRouter, categoriesRouter, postRouter } = require('./routers');

const app = express();

app.use(express.json());
app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/categories', categoriesRouter);
app.use('/post', postRouter);

module.exports = app;
