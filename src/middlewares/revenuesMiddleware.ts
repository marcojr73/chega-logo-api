import { NextFunction, Request, Response} from "express"
import schemas from "../schemas/index.js"

async function validateRevenuesdata(req:Request, res:Response, next: NextFunction){
    const {profit}: {profit: string} = req.body
    await schemas.revenuesSchema.validateAsync({profit})
    next()
}

export default {
    validateRevenuesdata,
}