require('dotenv').config();
require('./db');
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const { isAuthenticated } = require("./middlewares/jwt");



// Routers require
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const clientRouter = require("./routes/client");
const taskRouter = require("./routes/task");
const listRouter = require("./routes/list");
const userRouter = require("./routes/user")

const app = express(); 

// cookies and loggers
app.use(cors({
  origin: process.env.ORIGIN
}));
app.set('trust proxy', 1);



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



// routes intro
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use("/client", isAuthenticated, clientRouter)
app.use("/task",isAuthenticated, taskRouter)
app.use("/list" ,isAuthenticated, listRouter)
app.use("/user" , userRouter)


// Route controler 


app.use('*', (req, res, next) => {
  console.log(`Received request: ${req.method} ${req.originalUrl}`);
  next();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  if (err.status === 404) {
    res.status(err.status || 404);
  } else {
    res.status(err.status || 500);
  }
});

module.exports = app;
