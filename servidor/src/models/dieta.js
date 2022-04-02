// import mongoose from 'mongoose';
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DietasSchema = new Schema(
  {
    nombreDieta: { type: String, trim: true },
    descripcionDieta: { type: String, trim: true },
    img: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

DietasSchema.methods.setImg = function (file) {
  this.img = "/public/" + file;
};

// Convertir a modelo
const Dieta = mongoose.model("Dieta", DietasSchema);

module.exports = Dieta;
