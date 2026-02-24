import e from "express";
import ENV from "../lib/env.js";
import cookieParser from "cookie-parser";
import connectDB from "../lib/db.js";

const app = e();
const PORT = ENV.PORT || 5000;

app.use(e.json({ limit: "3mb" }));
app.use(cookieParser());

app.listen(PORT, () => {
  console.log(`Server connected to port ${PORT}`);
  connectDB();
});
