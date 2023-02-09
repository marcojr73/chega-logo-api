import { NextFunction, Request, Response} from "express"
import { truckEntity } from "../interfaces/index.js"
import authSchema from "../schemas/authSchema.js"

async function validateTruckdata(req:Request, res:Response, next: NextFunction){
    const data: truckEntity = req.body
    await authSchema.truckSchema.validateAsync(data)
    next()
}

export default {
    validateTruckdata,
}