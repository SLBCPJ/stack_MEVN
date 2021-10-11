// const aes = require('../helpers/aes.cipher')
import jwt from 'jsonwebtoken'
import User  from '../models/user'
import bcrypt from 'bcrypt'
const authService = {
    signToken: async function(id){
        return jwt.sign({id},'my App',{
            expiresIn: 60*60*24*365
        })
    },
    login: async function(data) {
        try {
            const {email,password} = data
            //let pass = aes.encrypt(password)
            let userExists = await User.findOne({email: email},'name email password').exec()
            // return userExists
            if (await bcrypt.compare(password, userExists.password).then(res=>res)) {
                const token = await this.signToken(userExists.id)
                return {
                    user: userExists,
                    code:200,
                    token
                 
                }
            }else{
                return {
                    code: 400,
                    error: true,
                    msg: "User or password incorrect"
                }
            }
        } catch (error) {
            return error
        }
    },
    register: async function(userData) {
        try {
            // let pass = aes.encrypt(userData.password)
            let  pass = await bcrypt.hash(userData.password, 10).then(res=>res)
            userData.password = pass
            await userData.save();
            let token = await this.signToken(userData._id)
            return {
                user: userData,
                code: 200,
                token
            }
        } catch (error) {
            return error
        }
    }
    // update: async function(User){
    //     const _id = req.params.id;
    //     const body = req.body;
    //     try {
    //         let  pass = await bcrypt.hash(User.password, 10).then(res=>res)
    //         User.password = pass
    //         const userDb = await User.findByIdAndUpdate(
    //             _id,
    //             body,
    //             pass,
    //             {new: true});
    //             res.json(userDb);
    //     } catch (error) {
    //         return error
    //     }
    // }
}

module.exports = authService;