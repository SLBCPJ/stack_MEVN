const User = require("../models/user");
const authService = require("../services/auth.services");
const msg = require("../helpers/messages");
// const { validationResult } = require("express-validator");

const authController = {
  login: async function (req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json("User and password required");
      }
      let token = await authService.login(req.body);
      // res.send(user)
      if (token) {
        res.status(token.code).json(token);
      } else {
        res.status(401).json({ msg: "Incorrect data" });
      }
    } catch (error) {
      res.send(error);
    }
    // try {
    //   const { email, password } = req.body;
    //   if (!email || !password) {
    //     res.status(400).json(msg.fieldsRequired);
    //   }
    //   const token = await authService.login(req.body);
    //   res.status(token.code).json(token);
    // } catch (error) {
    //   res.send(error);
    // }
  },
  register: async function (req, res) {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(422).json({ errors: errors.array() });
    // }
    try {
      const user = new User(req.body);
      const token = await authService.register(user);
      res.status(token.code).json({ token });
    } catch (error) {
      res.send(error);
    }
    
  },
  getAll: async function (req, res) {
    try {
      const userDb = await User.find();
      res.json(userDb);
    } catch (error) {
      return res.status(400).json({
        mensaje: "Ocurrio un error",
        error,
      });
    }
  },
  getId: async function (req, res) {
    const _id = req.params.id;
    try {
      const userDB = await User.findOne({ _id });
      res.json(userDB);
    } catch (error) {
      return res.status(400).json({
        mensaje: "Ocurrio un error",
        error,
      });
    }
  },
  deleteUser: async function (req, res) {
    const _id = req.params.id;
    try {
      const userDb = await User.findByIdAndDelete({ _id });
      if (!userDb) {
        return res.status(400).json({
          mensaje: "No se encontró el id indicado",
          error,
        });
      }
      res.json(userDb);
    } catch (error) {
      return res.status(400).json({
        mensaje: "Ocurrio un error",
        error,
      });
    }
  },
  updateUser: async function (req, res) {
    const _id = req.params.id;
    const body = req.body;
    try {
      const userDb = await User.findByIdAndUpdate(_id, body, { new: true });
      let tokenUp = await authService.register(userDb);
      res.status(tokenUp.code).json({ tokenUp });
      // res.json(userDb);
    } catch (error) {
      return res.status(400).json({
        mensaje: "Ocurrio un error",
        error,
      });
    }
  },
};

module.exports = authController;
