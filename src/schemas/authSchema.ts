import joi from "joi"

const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i
const passwordRegex = /[a-zA-Z0-9]{8}/i 

const userSchema = joi.object({
    email: joi.string().email().pattern(emailRegex).required(),
    password: joi.string().min(8).pattern(passwordRegex).required(),
})

export default {
    userSchema
} 