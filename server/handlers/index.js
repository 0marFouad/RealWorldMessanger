module.exports = {
    ...require('./auth'),
    ...require('./messages')
};

module.exports.errors = (err, req, res, next) => {
    res.status(err.status || 400).json({
        err: err.message || 'Something went wrong'
    });
    next(err);
};

module.exports.notFound = (err, req, res, next) => {
    err = new Error('Not Found');
    err.status = 404;
    next(err);
};