import joi from "joi"

const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/ ;

export const registerSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().pattern(new RegExp(passwordRegex)).required().messages({
        "string.pattren.base" : `password 8 caracter , 1 uppercase , and 1 number`,
    }),
    name: joi.string(),
    passwordConfirmation : joi.string(),
})