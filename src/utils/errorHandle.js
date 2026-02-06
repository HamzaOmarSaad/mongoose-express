const errorHandler = (status = 500, message = "failed") => {
  const error = new Error(message, {
    cause: {
      status,
      message,
    },
  });
  return error;
};
export default errorHandler;
