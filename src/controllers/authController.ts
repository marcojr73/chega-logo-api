import { Request, Response } from "express"
import { userEntity } from "../interfaces/index.js"
import authService from "../services/authService.js"

async function signUp(req: Request, res: Response){
    const {userName, password}: userEntity = req.body
    await authService.userAlreadyExist(userName)
    const passEncrypt = await authService.encryptPassword(password) 
    await authService.registerNewUser(userName, passEncrypt)
    res.status(201).send("Created")
}

async function signIn(req: Request, res: Response){
    const {userName, password} : userEntity = req.body
    const user = await authService.isUserRegister(userName)
    authService.verifyPasswordIsCorrect(password, user.password)
    const token = authService.generateToken(user.id)
    res.status(200).send(token)
}

export default {
    signUp,
    signIn
}