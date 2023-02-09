import { Request, Response } from "express"
import revenuesServices from "../services/revenuesServices.js"

async function newRevenue(req: Request, res: Response){
    const profit = +req.body.profit
    const userId: number = res.locals.userId
    await revenuesServices.insertRevenue(profit, userId)
    res.status(201).send("Created")
}

async function listRevenues(req: Request, res: Response){
    const lastMonthYear = revenuesServices.getLastTwelveMonthYear()
    const lastBalanceMonths = await revenuesServices.mappingBalanceLastMonth(lastMonthYear)
    res.status(200).send(lastBalanceMonths)
}

export default {
    newRevenue,
    listRevenues
}