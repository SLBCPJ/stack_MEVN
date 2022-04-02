const Rutina = require("../models/rutina");
const rutinaController = {
  add: async function (req, res) {
    try {
      const rutinaDB = new Rutina(req.body);
      const { filename } = req.file;
      rutinaDB.setImg(filename);
      await rutinaDB.save();
      res.status(200).json(rutinaDB);
    } catch (error) {
      return res.status(500).json({
        mensaje: "Ocurrio un error",
        error,
      });
    }
  },
  getId: async function (req, res) {
    const _id = req.params.id;
    try {
      const rutinaDB = await Rutina.findOne({ _id });
      res.json(rutinaDB);
    } catch (error) {
      return res.status(400).json({
        mensaje: "Ocurrio un error",
        error,
      });
    }
  },
  getAll: async function (req, res) {
    try {
      const rutinaDb = await Rutina.find();
      res.json(rutinaDb);
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
      const rutinaDb = await Rutina.findByIdAndDelete({ _id });
      if (!rutinaDb) {
        return res.status(400).json({
          mensaje: "No se encontró el id indicado",
          error,
        });
      }
      res.json(rutinaDb);
    } catch (error) {
      return res.status(400).json({
        mensaje: "Ocurrio un error",
        error,
      });
    }
  },
  edit: async function (req, res) {
    const _id = req.params.id;
    const body = req.body;
    try {
      const rutinaDb = await Rutina.findByIdAndUpdate(_id, body, { new: true });
      res.json(rutinaDb);
    } catch (error) {
      return res.status(400).json({
        mensaje: "Ocurrio un error",
        error,
      });
    }
    //   try {
    //     const _id = req.params._id;
    //     const rutina = req.body;
    //     const updateRutina = await Rutina.updateOne({ "id": _id }, rutina);
    //     res.status(200).json(updateRutina);
    // } catch (err) {
    //     res.status(400).json({ message: err.message });
    // }
  },
  editImage: async function (req, res) {
    try {
      const id = req.params.id;
      const imageName = req.file.filename;
      await Rutina.updateOne(
        { id: id },
        { imageUrl: "/public/" + imageName }
      );
      res.status(200).json({id: id, imageUrl: imageName});
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};

module.exports = rutinaController;
