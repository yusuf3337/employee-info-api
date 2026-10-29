const notFound = resource => {
  const error = new Error(`${resource} not found`);
  error.statusCode = 404;
  return error;
};

module.exports = notFound;
