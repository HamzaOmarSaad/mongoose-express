import mongoose, { model, Schema } from "mongoose";

const notesSchmena = new Schema(
  {
    title: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          if (isUpperCase(value)) {
            return false;
          }
          return true;
        },
        message: "title is entierly uppercase ",
      },
    },
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "users",
    },
  },
  { timestamps: true },
);

const noteModel = model("notes", notesSchmena);

export default noteModel;
