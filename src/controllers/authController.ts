import { Request, Response } from "express"

async function signUp(req: Request, res: Response){
    res.status(201).send("sign-up")
}

async function signIn(req: Request, res: Response){
    res.status(200).send("sign-in")
}

export default {
    signUp,
    signIn
}