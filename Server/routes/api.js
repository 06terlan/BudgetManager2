var express = require('express');
var router = express.Router();
const User = require('../models/user');
const { body, query, validationResult } = require('express-validator/check');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../middlewares/auth');
const mongoose = require('mongoose');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register',
	body(['email', 'password', 'firstname', 'lastname']).not().isEmpty().isString(),
	function(req, res, next) {

		const errors = validationResult(req); console.log(errors.isEmpty());
		if(errors.isEmpty()){
			bcrypt.hash(req.body.password, 10).then(function(hash) {
				req.body.password = hash;
			    const newUser = new User(req.body);
				newUser.save((error, user)=>{
					const payload = {subject: user._id};
					const token = jwt.sign(payload, 'secret');
					res.status(201).json({status:'Success', token: token});
				});
			});
		}
		else{
			res.status(404);
			res.json({status:'Error'});
		}
});
router.post('/login',
	body(['email', 'password']).not().isEmpty().isString(),
	function(req, res, next) {

		const errors = validationResult(req); console.log(errors.isEmpty());
		if(errors.isEmpty()){
			User.findOne({email: req.body.email}, (error, user)=>{
				if(user){

					bcrypt.compare(req.body.password, user.password).then((hRes)=>{
						if(hRes){
							const payload = {subject: user._id};
							const token = jwt.sign(payload, 'secret');
							res.status(200).json({status:'Success', token: token});
						}
						else{
							res.status(401).json({status:'Error', error: 'Password is wrong!'});
						}
					});
					
				}
				else{
					res.status(401).json({status:'Error', error: 'Password is wrong!'});
				}
			});
		}
		else{
			res.status(404);
			res.json({status:'Error'});
		}
});
router.get('/email', 
		query(['email']).not().isEmpty().isString(),
	(req, res, next)=>{
	
	User.findOne({email: req.query.email}, (err, user)=>{
		if(user) return res.json({exist: true});
		else res.json({exist: false});
	});
});
router.get('/protected', verifyToken, (req, res, next)=>{
	
	User.findOne({_id: mongoose.mongo.ObjectId(req.userId)}, (err, user)=>{
		if(err || !user)  res.status(404).json({status: 'Error', error: 'Not found'});
		else res.status(200).json({status: 'Success', data: user});
	});
});

module.exports = router;
