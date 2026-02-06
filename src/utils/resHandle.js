const resHandler = async (res, status = 200, message = "sucess", data = {}) => {
  return res.status(status).json({
    message,
    data,
  });
};
export default resHandler;
