import { body } from "express-validator";

export const registerValidation = [
  body("email", "неверный формат почты").isEmail(),
  body("password", "минимум 5 символов").isLength({ min: 5 }),
];
