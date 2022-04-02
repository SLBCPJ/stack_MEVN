// import mongoose from 'mongoose';
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema(
  {
    name: { type: String },
    email: { type: String, unique: true, trim: true },
    password: { type: String },
    tipoId: { type: String },
    numberIden: { type: String },
    address: { type: String },
    phone: { type: String },
    gender: { type: String },
    fechNaci: { type: Date },
    rol: { type: String, default: "User" }, //1 Administrador, 2 Usuario, 3 Empleado
    date: { type: Date, default: Date.now },
    activo: { type: Boolean, default: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("user", User);
// export default User;
// module.exports = User;
