import noteModel from "../../DB/models/notesModel.js";
import errorHandler from "../../utils/errorHandle.js";

export const createOneService = async (content, title, userId) => {
  const data = await noteModel.create({ title, content, userId });
  return data;
};
export const updateOneService = async (content, title, userId, noteId) => {
  const note = await noteModel.findById(noteId);
  if (!note) throw errorHandler(404, " note not found ");
  if (note.userId.toString() != userId.toString()) {
    throw errorHandler(401, "unauthrized user ");
  }
  const data = await noteModel.findByIdAndUpdate(
    noteId,
    {
      title,
      content,
    },
    { new: true },
  );
  return data;
};
export const ReplaceEntireService = async (
  content,
  title,
  loggedUserId,
  noteId,
  givenUserId,
) => {
  const note = await noteModel.findById(noteId);
  if (!note) throw errorHandler(404, "note not found");
  if (note.userId.toString() != loggedUserId.toString()) {
    throw errorHandler(401, "unauthrized user ");
  }
  const data = await noteModel.findByIdAndUpdate(
    noteId,
    {
      title,
      content,
      userId: givenUserId,
    },
    { new: true },
  );
  return data;
};
export const updateAllTitleService = async (title, userId) => {
  const data = await noteModel.updateMany({ userId }, { $set: { title } });
  return data;
};
export const deleteService = async (userId, noteId) => {
  const data = await noteModel.deleteOne({ userId, _id: noteId });
  if (data.deletedCount === 0) {
    throw errorHandler(402, "Note not found or unauthorized");
  }
  return data;
};
export const retrivePagennatedNotesService = async (userId, limit, page) => {
  const data = await noteModel
    .find({ userId })
    .limit(limit)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });
  if (data.length === 0) {
    throw errorHandler(402, "no notes created by the login user");
  }
  return data;
};
export const retriveOneNoteService = async (userId, noteId) => {
  const data = await noteModel.findById(noteId);

  if (!data) {
    throw errorHandler(402, "no notes created by the login user");
  }
  if (data.userId != userId) {
    throw errorHandler(402, "you are not the owner");
  }
  return data;
};
export const getByContentService = async (userId, content) => {
  const data = await noteModel.findOne({ content });

  if (!data) {
    throw errorHandler(402, "no notes with this content");
  }
  if (data.userId != userId) {
    throw errorHandler(402, "no notes with this content");
  }
  return data;
};
export const getAllAndUserContentService = async (userId) => {
  const data = await noteModel
    .find({ userId })
    .select("title createdAt userId")
    .populate({
      path: "userId",
      select: "email",
    });

  if (data.length === 0) {
    throw errorHandler(402, "no notes with this content");
  }

  return data;
};
export const getAllAndUserAggregateService = async (userId, title) => {
  const data = await noteModel.aggregate([
    {
      $match: { title, userId: new mongoose.Types.ObjectId(userId) },
    },
    {
      $lookup: {
        from: "user",
        localField: "userId",
        foreginfield: "_id",
        as: "user",
      },
    },
  ]);

  if (data.length === 0) {
    throw errorHandler(402, "no notes with this content");
  }
  return data;
};

export const deleteAllService = async (userId, noteId) => {
  const data = await noteModel.deleteMany({ userId });
  if (data.deletedCount === 0) {
    throw errorHandler(402, "Note not found or unauthorized");
  }
  return data;
};
