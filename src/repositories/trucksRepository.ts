import { prisma } from "../config/dataBase.js"
import { truckEntity } from "../interfaces/index.js"

async function findTruckByLicensePlate(licensePlate: string) {
    return await prisma.trucks.findFirst({
        where: {licensePlate}
    })
}

async function createTruck(truck: truckEntity) {
    return await prisma.trucks.create({
        data: truck
    })
}

async function findAllTrucks(page?: number, limit?: number) {
    return await prisma.trucks.findMany({
        take: limit,
        skip: (page-1) * limit
    })
}

export default {
    findTruckByLicensePlate,
    createTruck,
    findAllTrucks
}