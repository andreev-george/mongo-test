import express from "express";
import mongoose from "mongoose";
import { registerValidation } from "./validations/auth.js";
import checkAuth from "./utils/checkAuth.js";
import {
  register,
  login,
  getMe,
  getAll,
} from "./controllers/UserController.js";
import handleValidationErrors from "./utils/handleValidationErrors.js";
import cors from "cors";

mongoose
  .connect(
    "mongodb+srv://admin:123qwe@cluster0.w0m4n.mongodb.net/mongo_test?retryWrites=true&w=majority"
  )
  .then(() => console.log("db connected"))
  .catch((err) => console.log("DB error", err));

const app = express();
app.use(express.json());
app.use(cors());

app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  register
);
app.post("/auth/login", registerValidation, handleValidationErrors, login);
app.get("/auth/me", checkAuth, getMe);
app.get("/users", checkAuth,getAll);

app.listen(4000, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("server started");
});
