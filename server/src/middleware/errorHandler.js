export const notFoundHandler = (req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
};

export const errorHandler = (err, req, res, next) => {
  const status = err.status || err.code || 500;
  const message = err.message || 'Internal Server Error';
  const details = err.details || undefined;
  if (process.env.NODE_ENV !== 'production') {
    console.error('[Error]', status, message, details || '', err.stack || '');
  }
  res.status(status).json({ message, code: status, details });
};
