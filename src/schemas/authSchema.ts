import joi from "joi"

const nameRegex = /^[a-záàâãéèêíïóôõöúçñ ]+$/i

const userSchema = joi.object({
    userName: joi.string().min(4).pattern(nameRegex).required(),
    password: joi.string().min(8).required(),
})

export default {
    userSchema
} 