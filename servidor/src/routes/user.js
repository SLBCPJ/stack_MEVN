import express from 'express';
const router = express.Router();

import User from '../models/user';

// Agregar un nuevo cliente
router.post('/new-user', async(req, res) => {
    const body = req.body;  
    try {
      const userDB = await User.create(body);
      res.status(200).json(userDB); 
    } catch (error) {
      return res.status(500).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
  });

  // Get con parámetros
  router.get('/user/:id', async(req, res) => {
    const _id = req.params.id;
    try {
      const userDB = await User.findOne({_id});
      res.json(userDB);
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
  });
  
  // Get con todos los documentos
  router.get('/user', async(req, res) => {
    try {
      const userDb = await User.find();
      res.json(userDb);
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
  });

// eliminar un usuario
router.delete('/user/:id', async(req, res) => {
    const _id = req.params.id;
    try {
      const userDb = await User.findByIdAndDelete({_id});
      if(!userDb){
        return res.status(400).json({
          mensaje: 'No se encontró el id indicado',
          error
        })
      }
      res.json(userDb);  
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
  });

//actualizar un usuario
router.put('/update-user/:id', async(req, res) => {
    const _id = req.params.id;
    const body = req.body;
    try {
      const userDb = await User.findByIdAndUpdate(
        _id,
        body,
        {new: true});
      res.json(userDb);  
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
  });    


// Exportamos la configuración de express app
module.exports = router;  