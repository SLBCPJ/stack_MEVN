const express = require("express");
const router = express.Router();
const rutinaController = require("../controllers/rutina.controller");
// const Rutina = require('../models/rutina');
// const Auth = require('../middleware/authentication');
const upload = require('../helpers/storage');
  
// Agregar una nota
router.post("/new-rutina", upload.single('image'),rutinaController.add);

// Get con parámetros
router.get("/rutina/:id", rutinaController.getId);

// Get con todos los documentos
router.get("/rutinas", rutinaController.getAll);

// Delete eliminar una nota
router.delete("/rutina/:id", rutinaController.remove);

// Put actualizar una rutina
router.put("/rutina/:id", rutinaController.edit);

//put para actualizar imagen
router.put("/rutina/image/:id/", upload.single("image"), rutinaController.editImage);

// Exportamos la configuración de express app
module.exports = router;
