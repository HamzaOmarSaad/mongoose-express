import express from "express";
import "../config/config.service.js";
import ConnectDB from "./DB/config/db.connection.js";
import userRouter from "./modules/userModule/user.controller.js";
import router from "./modules/notesModule/notes.controller.js";
const Bootstrap = async () => {
  const app = express();
  app.use(express.json());
  await ConnectDB();

  app.use("/user", userRouter);
  app.use("/notes", router);

  //invalid routing
  app.use("{/dummy}", (req, res) => {
    return res.status(404).json({ message: "invalid path" });
  });

  // error handling
  app.use((error, reg, res, next) => {
    return res.status(error?.cause?.status || 500).json({
      message: "somthing went wrong " + error.message,
    });
  });
  app.listen(process.env.PORT, () =>
    console.log("app running on port " + process.env.PORT),
  );
};
export default Bootstrap;
