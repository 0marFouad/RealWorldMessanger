module.exports.errors = function(err, req, res, next){
    res.status(err.status || 500).json({
        err: err.message || 'Something went wrong'
    });
};

module.exports.notFound = function(err, req, res, next){
    res.status(err.status || 500).json({
        err: err.message || 'Something went wrong'
    });
};