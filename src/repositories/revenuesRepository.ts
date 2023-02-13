import { prisma } from "../config/dataBase.js"

async function createRevenue(value: number, userId: number){
    await prisma.revenues.create({
        data: {value, userId}
    })
}

async function getBalanceByMonthYear(month: number, year: number){
    return await prisma.$queryRaw`
        SELECT SUM(value), count(*) FROM revenues WHERE EXTRACT(MONTH FROM "createdAt") = ${month}
        AND EXTRACT(YEAR FROM "createdAt") = ${year}
    `
}

export default {
    createRevenue,
    getBalanceByMonthYear
}