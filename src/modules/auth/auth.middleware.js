import jwt from "jsonwebtoken";
import errorHandler from "../../utils/errorHandle.js";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(errorHandler(401, "No token provided"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      userId: decoded.userId,
    };

    next();
  } catch (err) {
    next(errorHandler(401, "Invalid or expired token"));
  }
};

export default authMiddleware;
