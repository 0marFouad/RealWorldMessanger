module.exports = {
    ...require('./auth')
};

module.exports.errors = (err, req, res, next) => {
    res.status(err.status || 500).json({
        err: err.message || 'Something went wrong'
    });
};

module.exports.notFound = (err, req, res, next) => {
    res.status(err.status || 500).json({
        err: err.message || 'Something went wrong'
    });
};