import { prisma } from "../config/dataBase.js"

async function createRevenue(profit: string, userId: number){
    await prisma.revenues.create({
        data: {profit, userId}
    })
}

export default {
    createRevenue
}