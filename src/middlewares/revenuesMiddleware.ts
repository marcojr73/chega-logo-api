import { NextFunction, Request, Response} from "express"
import schemas from "../schemas/index.js"

async function validateRevenuesdata(req:Request, res:Response, next: NextFunction){
    const {value}: {value: string} = req.body
    await schemas.revenuesSchema.validateAsync({value})
    next()
}

export default {
    validateRevenuesdata,
}