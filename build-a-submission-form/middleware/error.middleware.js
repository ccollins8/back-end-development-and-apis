function notFoundHandler ( req, res, next) {
    const err = new Error(req.originalUrl)
    err.status = 404
    next(err)
}

function finalErrorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = status === 500 
    ? 'Internal Server Error (Check Server Logs)' 
    : err.message;

  res.status(status).json({
    error: true,
    status,
    message
  });
}

export {notFoundHandler, finalErrorHandler}
