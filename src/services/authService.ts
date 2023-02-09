import userRepository from "../repositories/userRepository.js"
import errors from "../utils/errors/index.js"
import bcrypt from "bcrypt"

async function userAlereadyExist(userName: string){
    const user = await userRepository.findUserByName(userName)
    if(user) errors.conflict("userName already register db")
}

async function encryptPassword(password: string){
    return bcrypt.hashSync(password, 10)
}

async function registerNewUser(userName: string, password: string){
    await userRepository.createUser({userName, password})
}

export default {
    userAlereadyExist,
    encryptPassword,
    registerNewUser
}