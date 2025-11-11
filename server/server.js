import express from "express";
import "dotenv/config";
import cors from "cors";
import urlRoute from "./routes/urlRoute.js";
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());
app.use("/", urlRoute);

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
