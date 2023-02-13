import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken"

import userRepository from "../repositories/userRepository.js"
import errors from "../utils/errors/index.js"

async function userAlreadyExist(userName: string) {
    const user = await userRepository.findUserByName(userName)
    if (user) errors.conflict("userName already register on database")
}

async function encryptPassword(password: string) {
    return bcrypt.hashSync(password, 10)
}

async function registerNewUser(userName: string, password: string) {
    await userRepository.createUser({ userName, password })
}

async function isUserRegister(userName: string) {
    const user = await userRepository.findUserByName(userName)
    if (!user) errors.notFound("user not found")
    return user
}

function verifyPasswordIsCorrect(password: string, passCrypt: string) {
    const ans = bcrypt.compareSync(password, passCrypt)
    if (!ans) errors.unprocessableEntity("Your password is incorrect")
}

function generateToken(userId: number) {
    const { KEYJWT } = process.env
    return Jwt.sign({ userId }, KEYJWT, { expiresIn: "1d" })
}

export default {
    userAlreadyExist,
    encryptPassword,
    registerNewUser,
    isUserRegister,
    verifyPasswordIsCorrect,
    generateToken
}