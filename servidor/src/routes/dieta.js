const express = require('express');
const router = express.Router();
const dietController = require('../controllers/dieta.controller')
// const Dieta = require('../models/dieta')
// const Auth = require('../middleware/authentication')
const upload = require('../helpers/storage');


// Agregar una dieta
router.post('/new-dieta', upload.single('image'), dietController.agg);

  // Get con parámetros
router.get('/dieta/:id', dietController.getId);
  
  // Get con todos los documentos
  router.get('/dietas', dietController.getAll);

// Delete eliminar una dieta
router.delete('/dieta/:id', dietController.remove);

// Put actualizar una dieta
router.put('/dieta/:id', dietController.update);  

//put para actualizar imagen
router.put("/dieta/image/:id/", upload.single("image"), dietController.editImage);

  
  // Exportamos la configuración de express app
  module.exports = router;
