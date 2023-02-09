import { prisma } from "../config/dataBase.js"

async function findAllPlaces() {
    return await prisma.places.findMany({})
}

export default {
    findAllPlaces
}