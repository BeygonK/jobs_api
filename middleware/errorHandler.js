// Class for custom error handlers

class ErrorHandler{
    // Not found error
    static notFound(req, res, next) {
        const error = new Error(`Not Found - ${req.originalUrl}`);
        res.status = 404;
        next(error);
    }

    // Error handler middleware
    static errorHandler(error, req, res, next) {
        let statusCode = res.statusCode === 200 ? 500 : res.statusCode
        let message = error.message

        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            statusCode = 404;
            message = 'Resource not found';
        }

        res.statusCode(statusCode).json({
            message,
            stack: process.env.NODE_ENV === 'development'? error.stack : null,
        })
    }
    
}

module.exports = ErrorHandler;