import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const User = new Schema({
    name: {type: String, required: [true, 'Nombre obligatorio']},
    email: {type: String, required: [true, 'Email obligatorio'],unique: true, trim: true },
    password: {type: String, required: [true, 'Contraseña obligatoria']},
    // tipoid: {type: String, required:true },
    // numberIden: {type: String, required:true },
    // address: {type: String},
    // phone: {type: String},
    // gender: {type: String},
    // fechNaci: {type: Date},
    // rol: {type: String, default: 'User'},  //1 Administrador, 2 Usuario, 3 Empleado
    date:{type: Date, default: Date.now},
    activo: {type: Boolean, default: true}
});


module.exports = mongoose.model('user',User)
// export default User;
// module.exports = User;