import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const User = new Schema({
    name: {type: String, required: [true, 'Nombre obligatorio']},
    email: {type: String, required: [true, 'Email obligatorio'],unique: true, trim: true },
    password: {type: String, required: [true, 'Contraseña obligatoria']},
    date:{type: Date, default: Date.now},
    activo: {type: Boolean, default: true}
});


module.exports = mongoose.model('user',User)
// export default User;
// module.exports = User;