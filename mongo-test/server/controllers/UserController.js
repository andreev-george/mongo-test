import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../models/User.js";

export const register = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      passwordHash: hash,
      devices: req.body.devices,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "ошибка регистрации",
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOneAndUpdate(
      {
        email: req.body.email,
      },
      {
        $addToSet: { devices: req.body.devices },
      },
      { returnDocument: "after" }
    );

    if (!user) {
      return res.status(404).json({
        msg: "неверная почта",
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPass) {
      return res.status(404).json({
        msg: "неверный пароль",
      });
    }
    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret",
      {
        expiresIn: "30d",
      }
    );
    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "ошибка авторизации",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        msg: "нет пользователя",
      });
    }
    const { passwordHash, ...userData } = user._doc;

    res.json({
      userData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "нет доступа",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "пользователи не найдены",
    });
  }
};
