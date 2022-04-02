const Dieta = require("../models/dieta");

const dietController = {
  agg: async function (req, res) {
    try {
      const dietaDB = new Dieta(req.body);
      const { filename } = req.file;
      dietaDB.setImg(filename);
      await dietaDB.save();
      res.status(200).json(dietaDB);
    } catch (error) {
      return res.status(500).json({
        mensaje: "Ocurrio un error",
        error,
      });
    }

    //esta linea de codigo si me guarda las imagenes en la db
    // try {
    //   const dieta = new Dieta(req.body)
    //   const {filename}=req.file
    //   dieta.setImg(filename)
    //   await dieta.save()
    //   res.send(dieta)
    // } catch (error)  {
    //     return res.status(500).json({
    //       mensaje: 'Ocurrio un error',
    //       error
    //     })
    // }
  },
  getId: async function (req, res) {
    const _id = req.params.id;
    try {
      const dietaDB = await Dieta.findOne({ _id });
      res.json(dietaDB);
    } catch (error) {
      return res.status(400).json({
        mensaje: "Ocurrio un error",
        error,
      });
    }
  },
  getAll: async function (req, res) {
    try {
      const dietaDb = await Dieta.find();
      res.json(dietaDb);
    } catch (error) {
      return res.status(400).json({
        mensaje: "Ocurrio un error",
        error,
      });
    }
  },
  remove: async function (req, res) {
    const _id = req.params.id;
    try {
      const dietaDb = await Dieta.findByIdAndDelete({ _id });
      if (!dietaDb) {
        return res.status(400).json({
          mensaje: "No se encontró el id indicado",
          error,
        });
      }
      res.json(dietaDb);
    } catch (error) {
      return res.status(400).json({
        mensaje: "Ocurrio un error",
        error,
      });
    }
  },
  update: async function (req, res) {
    const _id = req.params.id;
    const body = req.body;
    try {
      const dietaDb = await Dieta.findByIdAndUpdate(_id, body, { new: true });
      res.json(dietaDb);
    } catch (error) {
      return res.status(400).json({
        mensaje: "Ocurrio un error",
        error,
      });
    }
  },
  editImage: async function (req, res) {
    try {
      const id = req.params.id;
      const imageName = req.file.filename;
      await Dieta.updateOne({ id: id }, { img: "/public/" + imageName });
      res.status(200).json({ id: id, img: imageName });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};

module.exports = dietController;
