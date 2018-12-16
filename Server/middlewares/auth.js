const jwt = require('jsonwebtoken');

module.exports.verifyToken = function(req, res, next){
	if(!req.headers.authorization ||
		req.headers.authorization.split(' ')[1] === null
	){
		return res.status(401).json({status:'Error', error: 'Unauthorized'});
	}

	const payload = jwt.verify(req.headers.authorization.split(' ')[1], 'secret');
	if(!payload){
		return res.status(401).json({status:'Error', error: 'Unauthorized'});
	}

	req.userId = payload.subject; console.log(req.userId);
	next();
}