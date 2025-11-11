import mongoose from "mongoose";

function connectDB(url) {
  const conn = mongoose.createConnection(url);
  return conn;
}

export default connectDB;
