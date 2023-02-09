import { NextFunction, Request, Response} from "express"
import { userEntity } from "../interfaces/index.js"
import authSchema from "../schemas/authSchema.js"

async function validateAuthdata(req:Request, res:Response, next: NextFunction){
    const data: userEntity = req.body
    await authSchema.userSchema.validateAsync(data)
    next()
}

export default {
    validateAuthdata,
}