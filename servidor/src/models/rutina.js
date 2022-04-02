// import mongoose from 'mongoose';
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RutinasSchema = new Schema(
  {
    nombreRutina: { type: String, trim: true },
    descripcionRutina: { type: String, trim: true },
    imageUrl: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
RutinasSchema.methods.setImg = function (file) {
    this.imageUrl = "/public/" + file;
  };

// Convertir a modelo
const Rutina = mongoose.model("Rutina", RutinasSchema);

module.exports = Rutina;
