module.exports = {
    ...require('./auth')
};

module.exports.errors = (err, req, res, next) => {
    res.status(err.status || 400).json({
        err: err.message || 'Something went wrong'
    });
};

module.exports.notFound = (err, req, res, next) => {
    err = new Error('Not Found');
    err.status = 404;
    next(err);
};