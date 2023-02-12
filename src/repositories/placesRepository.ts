import { prisma } from "../config/dataBase.js"
import { placesEntity } from "../interfaces/index.js"

async function findAllPlaces(page, limit) {
    return await prisma.places.findMany({
        take: limit,
        skip: (page - 1) * limit
    })
}

async function findPlaceById(id: number){
    return await prisma.places.findFirst({
        where: {id}
    })
}

async function createPlaceDb(place: placesEntity){
    await prisma.places.create({
        data: place
    })
}

async function deletePlaceById(id){
    await prisma.places.delete({
        where: {id}
    })
}

export default {
    findAllPlaces,
    findPlaceById,
    createPlaceDb,
    deletePlaceById
}