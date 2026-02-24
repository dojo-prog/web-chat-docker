export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const logPayload = {
    message: err.message,
    statusCode,
    method: req.method,
    path: req.originalUrl,
    ip: req.ip,
    userId: req.user?.id,
    timestamp: new Date().toISOString(),
  };

  if (statusCode >= 500) {
    console.error("SERVER ERROR", {
      ...logPayload,
      stack: err.stack,
    });
  } else {
    console.warn(" CLIENT ERROR", logPayload);
  }

  res.status(statusCode).json({
    success: false,
    message:
      process.env.NODE_ENV === "production" && statusCode >= 500
        ? "Something went wrong"
        : err.message,
  });
};
