import express from 'express';
const router = express.Router();

import Rutina from '../models/rutina';

// Agregar una nota
router.post('/new-rutina', async(req, res) => {
    const body = req.body;  
    try {
      const rutinaDB = await Rutina.create(body);
      res.status(200).json(rutinaDB); 
    } catch (error) {
      return res.status(500).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
  });

  // Get con parámetros
router.get('/rutina/:id', async(req, res) => {
    const _id = req.params.id;
    try {
      const rutinaDB = await Rutina.findOne({_id});
      res.json(rutinaDB);
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
  });
  
  // Get con todos los documentos
  router.get('/rutina', async(req, res) => {
    try {
      const rutinaDb = await Rutina.find();
      res.json(rutinaDb);
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
  });

// Delete eliminar una nota
router.delete('/rutina/:id', async(req, res) => {
    const _id = req.params.id;
    try {
      const rutinaDb = await Rutina.findByIdAndDelete({_id});
      if(!rutinaDb){
        return res.status(400).json({
          mensaje: 'No se encontró el id indicado',
          error
        })
      }
      res.json(rutinaDb);  
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
  });

// Put actualizar una rutina
router.put('/rutina/:id', async(req, res) => {
    const _id = req.params.id;
    const body = req.body;
    try {
      const rutinaDb = await Rutina.findByIdAndUpdate(
        _id,
        body,
        {new: true});
      res.json(rutinaDb);  
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
  });  


  
  // Exportamos la configuración de express app
  module.exports = router;
