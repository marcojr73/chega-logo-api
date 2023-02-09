import revenuesRepository from "../repositories/revenuesRepository.js"

async function insertRevenue(profit: string, userId: number){
    await revenuesRepository.createRevenue(profit, userId)
}

export default {
    insertRevenue
}