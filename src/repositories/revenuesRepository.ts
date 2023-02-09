import { prisma } from "../config/dataBase.js"

async function createRevenue(profit: number, userId: number){
    await prisma.revenues.create({
        data: {profit, userId}
    })
}

async function getBalanceByMonthYear(month: number, year: number){
    return await prisma.$queryRaw`
        SELECT SUM(profit) FROM revenues WHERE EXTRACT(MONTH FROM "createdAt") = ${month}
        AND EXTRACT(YEAR FROM "createdAt") = ${year}
    `
}

export default {
    createRevenue,
    getBalanceByMonthYear
}