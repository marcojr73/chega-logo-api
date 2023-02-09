import { NextFunction, Request, Response} from "express"
import { truckEntity } from "../interfaces/index.js"
import schemas from "../schemas/index.js"

async function validateTruckdata(req:Request, res:Response, next: NextFunction){
    const data: truckEntity = req.body
    await schemas.truckSchema.validateAsync(data)
    next()
}

export default {
    validateTruckdata,
}