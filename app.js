const express = require('express');
const path = require('path');
const app = express();

const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const logger = require('morgan');
const cors = require('cors');

// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');

const routes = require('./routes');


// view engine setup
app.set('view engine', 'pug');

// app.use(cors());
const whitelist = ['http://localhost:3000'];
const corsOptions = {
  credentials: true, // This is important.
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      return callback(null, true)
    }
    callback(new Error('Not allowed by CORS'));
  }
}

app.use(cors(corsOptions));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });

app.use(routes)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    title: err.title,
    message: err.message,
    errors: err.errors,
  })
})


module.exports = app;
