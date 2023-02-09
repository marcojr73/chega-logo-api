import { Request, Response } from "express"
import revenuesServices from "../services/revenuesServices.js"

async function newRevenue(req: Request, res: Response){
    const {profit}: {profit: string} = req.body
    const userId: number = res.locals.userId
    await revenuesServices.insertRevenue(profit, userId)
    res.status(201).send("revenues")
}

export default {
    newRevenue,
}