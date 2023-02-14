import { NextFunction, Request, Response } from "express"

export default async function errorHandler(error, req: Request, res: Response, next: NextFunction){
    if(error.isJoi){
        return res.status(422).send(error.message)
    }
    if(error){
        return res.status(error.status).send(error.message)
    }
    res.status(500).send("an internal error occurred")
}