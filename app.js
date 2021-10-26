require('dotenv').config()
require("./config/mongo");

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const flash = require("connect-flash");
const hbs = require("hbs");
const session = require("express-session");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var userSkillRouter = require('./routes/profileRoutes/userSkills');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + "/views/partials");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));





// INITIALIZE SESSION
app.use(
  session({
    secret: "ASecretStringThatSouldBeHARDTOGUESS/CRACK",
    saveUninitialized: true,
    resave: true,
  })
);

app.use((req, res, next) => {
  req.session.currentUser = {
    name : "Joe",
    nickname: "SuperJoe",
    email : "joe@joe.com",
    phone : "12",
    password :"multipass",
    rates : 2,
    _id: '617867836b38bde79b10bc55',
    skills : "6177fee71b747cb8f07883a4"
  }
  next()
})



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const mumuRouter =require('./routes/profileRoutes/mumuRoute')
const profileRouter = require('./routes/profileRoutes/profile')



app.use('/profile', mumuRouter);




app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/profile', profileRouter);
app.use('/profile/skills', userSkillRouter);
app.use('/', require('./routes/profileRoutes/previousExchanges'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// FLASH MESSAGES
// enable "flash messaging" system
// flash relies on the express-session mechanism
app.use(flash());

// app.use(require("./middlewares/exposeFlashMessage"));
// app.use(require("./middlewares/exposeLoginStatus"));

// CUSTOM MIDDLEWARES
app.use(function myCookieLogger(req, res, next) {
  console.log(req.cookies);
  next();
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
