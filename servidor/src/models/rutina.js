import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const RutinasSchema = new Schema({
    nombreRutina: String,
    descripcionRutina: String,
})

// Convertir a modelo
const Rutina = mongoose.model('Rutina', RutinasSchema);

export default Rutina;