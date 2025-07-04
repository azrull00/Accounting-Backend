// middleware/errorHandler.js
function errorHandler(err, req, res, next) {
    console.error(err.stack);

    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        status: 'error',
        statusCode: statusCode,
        message: err.message || 'Terjadi kesalahan internal',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
}

module.exports = errorHandler;