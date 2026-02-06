import { Router } from "express";
import resHandler from "../../utils/resHandle.js";
import authMiddleware from "../auth/auth.middleware.js";
import {
  createOneService,
  deleteAllService,
  deleteService,
  getAllAndUserAggregateService,
  getAllAndUserContentService,
  getByContentService,
  ReplaceEntireService,
  retriveOneNoteService,
  retrivePagennatedNotesService,
  updateAllTitleService,
  updateOneService,
} from "./notes.service.js";

const router = Router();

router.post("/", authMiddleware, async (req, res) => {
  const { content, title } = req.body;
  const userId = req.user.userId;
  const data = await createOneService(content, title, userId);
  return resHandler(res, 201, "created Sucessfully", data);
});
router.patch("/:noteid", authMiddleware, async (req, res) => {
  const { content, title } = req.body;
  const userId = req.user.userId;
  const noteId = req.params.noteid;
  const data = await updateOneService(content, title, userId, noteId);
  return resHandler(res, 200, "updated Sucessfully", data);
});
router.put("/replace/:noteid", authMiddleware, async (req, res) => {
  const { content, title } = req.body;
  const givenUserId = req.body.userId;
  const loggedUserId = req.user.userId;
  const noteId = req.params.noteid;
  const data = await ReplaceEntireService(
    content,
    title,
    loggedUserId,
    noteId,
    givenUserId,
  );
  return resHandler(res, 200, "updated Sucessfully", data);
});
router.patch("/all", authMiddleware, async (req, res) => {
  const { title } = req.body;
  const userId = req.user.userId;
  const data = await updateAllTitleService(title, userId);
  return resHandler(res, 200, " title updated Sucessfully", data);
});
router.delete("/:noteId", authMiddleware, async (req, res) => {
  const userId = req.user.userId;
  const noteId = req.params.noteId;
  const data = await deleteService(userId, noteId);
  return resHandler(res, 200, "  deleted Sucessfully", data);
});
router.get("/paginate-sort", authMiddleware, async (req, res) => {
  const userId = req.user.userId;
  const page = Number(req.query.page);
  const limit = Number(req.query.limit);
  const data = await retrivePagennatedNotesService(userId, limit, page);
  return resHandler(res, 200, " sucess", data);
});

router.get("/note-by-content", authMiddleware, async (req, res) => {
  const userId = req.user.userId;
  const { content } = req.query;
  const data = await getByContentService(userId, content);
  return resHandler(res, 200, " sucess", data);
});
router.get("/note-with-user", authMiddleware, async (req, res) => {
  const userId = req.user.userId;
  const data = await getAllAndUserContentService(userId);
  return resHandler(res, 200, " sucess", data);
});
router.get("/aggregate", authMiddleware, async (req, res) => {
  const userId = req.user.userId;
  const { title } = req.query;
  const data = await getAllAndUserAggregateService(userId, title);
  return resHandler(res, 200, " sucess", data);
});
router.get("/:id", authMiddleware, async (req, res) => {
  const userId = req.user.userId;
  const { id } = req.params;
  const data = await retriveOneNoteService(userId, id);
  return resHandler(res, 200, " sucess", data);
});
router.delete("/", authMiddleware, async (req, res) => {
  const userId = req.user.userId;
  const data = await deleteAllService(userId);
  return resHandler(res, 200, "deleted Sucessfully", data);
});

export default router;
