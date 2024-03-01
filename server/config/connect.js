import mongoose from "mongoose";

const connect = async (req, res) => {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
};

export default connect;
