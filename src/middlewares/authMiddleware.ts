import { NextFunction, Request, Response} from "express"
import { userEntity } from "../interfaces/index.js"
import schemas from "../schemas/index.js"

async function validateAuthdata(req:Request, res:Response, next: NextFunction){
    const data: userEntity = req.body
    await schemas.userSchema.validateAsync(data)
    next()
}

export default {
    validateAuthdata,
}