import e from "express";
import ENV from "../lib/env.js";
import cookieParser from "cookie-parser";
import connectDB from "../lib/db.js";
import authRouter from "../routes/auth.route.js";
import { errorHandler } from "../middlewares/error.middleware.js";

const app = e();
const PORT = ENV.PORT || 5000;

app.use(e.json({ limit: "3mb" }));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server connected to port ${PORT}`);
  connectDB();
});
