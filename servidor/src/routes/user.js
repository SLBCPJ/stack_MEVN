const express = require("express");

const router = express.Router();
// const authService = require("../services/auth.services");
// const User = require("../models/user");
const userController = require("../controllers/user.controller");
// const Auth = require("../middleware/authentication");
// const {validateCreate} = require('../validators/user.validator');
const userValidations = require('../validators/user.validator')

//*******Auth Routes
router.post("/login", userValidations.validateLogin, userController.login);
router.post("/register", userValidations.validateCreate, userController.register);
router.get("/user/:id", userController.getId);
router.get("/users", userController.getAll);
router.delete("/user-delete/:id", userController.deleteUser);
router.put("/update-user/:id", userController.updateUser);
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       res.status(400).json("User and password required");
//     }
//     let token = await authService.login(req.body);
//     // res.send(user)
//     if (token) {
//       res.status(token.code).json(token);
//     } else {
//       res.status(401).json({ msg: "Incorrect data" });
//     }
//   } catch (error) {
//     res.send(error);
//   }
// });
// Agregar un nuevo cliente
// router.post('/new-user', async(req, res) => {
//     const body = req.body;
//     try {
//       const userDB = await User.create(body);
//       res.status(200).json(userDB);
//     } catch (error) {
//       return res.status(500).json({
//         mensaje: 'Ocurrio un error',
//         error
//       })
//     }
//   });
// router.post("/register", async (req, res) => {
//   try {
//     const user = new User(req.body);
//     const userSaved = await authService.register(user);
//     res.send(userSaved);
//   } catch (error) {
//     res.send(error);
//   }
// });
// // Get con parámetros
// router.get("/user/:id", async (req, res) => {
//   const _id = req.params.id;
//   try {
//     const userDB = await User.findOne({ _id });
//     res.json(userDB);
//   } catch (error) {
//     return res.status(400).json({
//       mensaje: "Ocurrio un error",
//       error,
//     });
//   }
// });

// // Get con todos los documentos
// router.get("/user", async (req, res) => {
//   try {
//     const userDb = await User.find();
//     res.json(userDb);
//   } catch (error) {
//     return res.status(400).json({
//       mensaje: "Ocurrio un error",
//       error,
//     });
//   }
// });

// // eliminar un usuario
// router.delete("/user/:id", async (req, res) => {
//   const _id = req.params.id;
//   try {
//     const userDb = await User.findByIdAndDelete({ _id });
//     if (!userDb) {
//       return res.status(400).json({
//         mensaje: "No se encontró el id indicado",
//         error,
//       });
//     }
//     res.json(userDb);
//   } catch (error) {
//     return res.status(400).json({
//       mensaje: "Ocurrio un error",
//       error,
//     });
//   }
// });

// //actualizar un usuario
// router.put("/update-user/:id", async (req, res) => {
//   const _id = req.params.id;
//   const body = req.body;
//   try {
//     const userDb = await User.findByIdAndUpdate(_id, body, { new: true });
//     res.json(userDb);
//   } catch (error) {
//     return res.status(400).json({
//       mensaje: "Ocurrio un error",
//       error,
//     });
//   }
// });

// Exportamos la configuración de express app
module.exports = router;
