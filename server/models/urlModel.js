import { Schema } from "mongoose";
import connectDB from "../config/db.js";
import "dotenv/config";

const DB = connectDB(process.env.MONGO_URI);

const urlSchema = new Schema({
  url: {
    type: String,
    required: true,
    unique: true,
  },
  shortUrl: {
    type: String,
    unique: true,
  },
  createdAt: {
    type: Date,
    dafault: new Date(),
  },
});

const UrlModel = DB.model("url", urlSchema);

export default UrlModel;
