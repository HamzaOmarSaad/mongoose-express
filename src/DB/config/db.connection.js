import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    const conn = mongoose.connect(process.env.DB_URI, {
      dbName: "stickyNotesAPP",
    });
    console.log("connection established");
  } catch (error) {
    console.log("connection faild" + error.message);
  }
};

export default ConnectDB;
