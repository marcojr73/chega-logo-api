import { prisma } from "../config/dataBase.js"
import { truckEntity } from "../interfaces/index.js"

async function findTruckByLicensePlate(licensePlate: string) {
    return await prisma.trucks.findFirst({
        where: { licensePlate }
    })
}

async function upsertTruck(truck: truckEntity) {
    return await prisma.trucks.upsert({
        where: {
            licensePlate: truck.licensePlate,
        },
        update: truck,
        create: truck
    })
}

async function deleteTruckByLicensePlate(licensePlate: string){
    await prisma.trucks.delete({
        where: {licensePlate}
    })
}

async function findAllTrucks(page?: number, limit?: number) {
    return await prisma.trucks.findMany({
        take: limit,
        skip: (page - 1) * limit
    })
}

export default {
    findTruckByLicensePlate,
    upsertTruck,
    findAllTrucks,
    deleteTruckByLicensePlate
}