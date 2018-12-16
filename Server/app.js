var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');

var apiRouter = require('./routes/api');

var app = express();
mongoose.set('useCreateIndex', true)
const PORT = 4000;
let db;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next)=>{
	if(db){
		req.db = db;
		next();
	}
	else{
		mongoose.connect('mongodb://localhost:27017/app', {useNewUrlParser: true}, (err)=>{
			if(err){
				console.log(err);
			}
			else{
				req.db = db;
				next();
			}
		});
	}
});
app.use(cors());

app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  req.status(404).json({status: 'Error', error: "Api doen't exist!"});
});

app.listen(PORT, ()=>console.log("Listening port: " + PORT));

module.exports = app;
