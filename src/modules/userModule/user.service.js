import usersModel from "../../DB/models/usersModel.js";
import errorHandler from "../../utils/errorHandle.js";
import bcrypt from "bcryptjs";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

export const signupService = async (email, name, password, phone, age) => {
  const emailExist = await usersModel.findOne({ email });
  if (emailExist) {
    throw errorHandler(400, "email alredy exist");
  }
  const hashedPassword = bcrypt.hashSync(password, 8);
  const ecryptedPhone = CryptoJS.AES.encrypt(
    phone,
    process.env.PHONE_SECRET,
  ).toString();

  const user = await usersModel.create({
    email,
    name,
    password: hashedPassword,
    phone: ecryptedPhone,
    age,
  });
  return user;
};
export const loginService = async (email, password) => {
  const user = await usersModel.findOne({ email });
  if (!user) {
    throw errorHandler(401, "wrong credantials");
  }
  if (bcrypt.compareSync(password, user.password)) {
    throw errorHandler(401, "wrong credantials");
  }
  const token = jwt.sign({ userId: user._Id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return { token };
};
export const updateDataService = async (email, name, phone, age, userId) => {
  const emailExist = await usersModel.findOne({ email });
  if (emailExist) {
    throw errorHandler(400, "email already in use ");
  }
  const newuser = await usersModel.findByIdAndUpdate(userId, {
    email,
    name,
    phone,
    age,
  });
  return newuser;
};
export const DeleteService = async (userId) => {
  const user = await usersModel.findByIdAndDelete(userId);
  return user;
};
export const getUserService = async (userId) => {
  const user = await usersModel.findById(userId);
  return user;
};
