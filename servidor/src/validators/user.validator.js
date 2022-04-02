const { check } = require("express-validator");
const { validateResult } = require("../helpers/validate.helper");
// const validateCreate = [
//   check("name").exists().not().isEmpty(),
//   check("email").exists().isEmail(),
//   check('password').exists().isEmpty(),
//   (req, res, next) => {
//     validateResult(req, res, next);
//   },
// ];
const userValidations  = {
    validateCreate: [
        check("name", "Nombre no valido, minimo 3 caracteres, maximo 40 caracteres").isLength({
            min: 3,
            max: 40,
          }).exists().not().isEmpty(),
        check("email",'Email no valido').isEmail().exists(),
        (req, res, next) => {
        validateResult(req, res, next);
        },
    ],
    validateLogin: [
        check('email','Ingrese un email valido').isEmail(),
        check('password','Ingrese password').exists()
    ]
}

// module.exports = { validateCreate };
module.exports=userValidations
