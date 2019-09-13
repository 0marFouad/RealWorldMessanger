const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    if(req.headers['authorization']){
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.SECRET, function (err, decoded) {
            if(err){
                next(Error('Failed to authenticate token'));
            }else{
                req.decoded = decoded;
                next();
            }
        })
    }else{
       next(Error('No token provided')); 
    }
};