import express from 'express';
const router = express.Router();

import Dieta from '../models/dieta';
import Auth from '../middleware/authentication'


// Agregar una dieta
router.post('/new-dieta', async(req, res) => {
    const body = req.body;  
    try {
      const dietaDB = await Dieta.create(body);
      res.status(200).json(dietaDB); 
    } catch (error) {
      return res.status(500).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
  });

  // Get con parámetros
router.get('/dieta/:id', async(req, res) => {
    const _id = req.params.id;
    try {
      const dietaDB = await Dieta.findOne({_id});
      res.json(dietaDB);
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
  });
  
  // Get con todos los documentos
  router.get('/dieta', async(req, res) => {
    try {
      const dietaDb = await Dieta.find();
      res.json(dietaDb);
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
  });

// Delete eliminar una dieta
router.delete('/dieta/:id', Auth, async(req, res) => {
    const _id = req.params.id;
    try {
      const dietaDb = await Dieta.findByIdAndDelete({_id});
      if(!dietaDb){
        return res.status(400).json({
          mensaje: 'No se encontró el id indicado',
          error
        })
      }
      res.json(dietaDb);  
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
  });

// Put actualizar una dieta
router.put('/dieta/:id', Auth, async(req, res) => {
    const _id = req.params.id;
    const body = req.body;
    try {
      const dietaDb = await Dieta.findByIdAndUpdate(
        _id,
        body,
        {new: true});
      res.json(dietaDb);  
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
  });  


  
  // Exportamos la configuración de express app
  module.exports = router;
