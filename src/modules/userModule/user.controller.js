import { Router } from "express";
import {
  DeleteService,
  getUserService,
  signupService,
  updateDataService,
} from "./user.service.js";
import resHandle from "../../utils/resHandle.js";
import authMiddleware from "../auth/auth.middleware.js";

const router = Router();

router.post("/singup", async (req, res) => {
  const { email, name, password, phone, age } = req.body;
  const user = await signupService(email, name, password, phone, age);
  return resHandle(res, 201, "sucess", user);
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const data = await signupService(email, password);
  return resHandle(res, 200, "login succefully", data);
});

router.patch("/", authMiddleware, async (req, res) => {
  const { email, name, phone, age } = req.body;
  const userId = req.user.userId;
  const data = updateDataService(email, name, phone, age, userId);
  return resHandle(res, 201, "sucess", data);
});

router.delete("/", authMiddleware, async (req, res) => {
  const userId = req.user.userId;
  const data = DeleteServiceService(userId);
  return resHandle(res, 200, "deleted succefully", data);
});
router.get("/", authMiddleware, async (req, res) => {
  const userId = req.user.userId;
  const data = getUserService(userId);
  return resHandle(res, 200, "sucess", data);
});

export default router;
