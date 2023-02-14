import joi from "joi"

const nameRegex = /^[a-záàâãéèêíïóôõöúçñ ]+$/i
const licensePlateRegex = /[A-Z]{3}[0-9][0-9A-Z][0-9]{2}/i

const userSchema = joi.object({
    userName: joi.string().min(4).pattern(nameRegex).required(),
    password: joi.string().min(8).required(),
})

const truckSchema = joi.object({
    name: joi.string().min(3).required(),
    licensePlate: joi.string().min(0).pattern(licensePlateRegex).required(),
    year: joi.string().min(0).required(),
    color: joi.string().min(0).required(),
    efficiency: joi.string().min(0).required(),
})

const revenuesSchema = joi.object({
    value: joi.number().min(0).required(),
})

export default {
    userSchema,
    truckSchema,
    revenuesSchema
} 