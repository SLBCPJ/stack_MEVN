import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const DietasSchema = new Schema({
    nombreDieta: String,
    descripcionDieta: String,
})

// Convertir a modelo
const Dieta = mongoose.model('Dieta', DietasSchema);

export default Dieta;