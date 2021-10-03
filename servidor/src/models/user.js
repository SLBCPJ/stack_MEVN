import mongoose from 'mongoose';
import bcrypt from "bcryptjs";
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: {type: String, required: [true, 'Nombre obligatorio']},
    email: {type: String, required: [true, 'Email obligatorio'],unique: true, trim: true },
    password: {type: String, required: [true, 'Contraseña obligatoria']},
    date:{type: Date, default: Date.now},
    activo: {type: Boolean, default: true}
});

//Encriptar Contraseñas
UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};
//comparar passwords
UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', UserSchema);

export default User;
// module.exports = User;