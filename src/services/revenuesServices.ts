import revenuesRepository from "../repositories/revenuesRepository.js"
import dayjs from "dayjs"
import { lastMonthYearEntity } from "../interfaces/index.js"

async function insertRevenue(profit: number, userId: number){
    await revenuesRepository.createRevenue(profit, userId)
}

function getLastTwelveMonthYear() {
    const lastMonths = [
        dayjs().month(1),
        dayjs().month(0),
        dayjs().month(-1),
        dayjs().month(-2),
        dayjs().month(-3),
        dayjs().month(-4),
        dayjs().month(-5),
        dayjs().month(-6),
        dayjs().month(-7),
        dayjs().month(-8),
        dayjs().month(-9),
        dayjs().month(-10),
    ]
    return lastMonths.map(month => {
        return {
            month: month.format("M"),
            year: month.format("YYYY"),

        }
    })
}

async function mappingBalanceLastMonth(lastMonthsYears: lastMonthYearEntity) {

    const balance = []
    const hash = {
        1: "Jan",
        2: "Fev",
        3: "Mar",
        4: "Abr",
        5: "Mai",
        6: "Jun",
        7: "Jul",
        8: "Ago",
        9: "Set",
        10: "Out",
        11: "Nov",
        12: "Dez",
    }

    let sumBilling = 0

    for (const monthYear of lastMonthsYears) {
        const sum = await revenuesRepository.getBalanceByMonthYear(+monthYear.month, +monthYear.year)
        balance.push({
            date: `${hash[+monthYear.month]}/${monthYear.year}`,
            balance: Number(sum[0].sum),
        })
        sumBilling += Number(sum[0].sum)
    }

    const stats = {
        sumBilling,
        mediaBilling: (sumBilling/12).toFixed(2)
    }

    return {balance, stats}
}

export default {
    insertRevenue,
    getLastTwelveMonthYear,
    mappingBalanceLastMonth
}