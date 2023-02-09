import { truckEntity } from "../interfaces/index.js"
import trucksRepository from "../repositories/trucksRepository.js"
import errors from "../utils/errors/index.js"

async function truckAlreadyExist(licensePlate: string) {
    const truck = await trucksRepository.findTruckByLicensePlate(licensePlate)
    if(truck) errors.conflict("Truck already register on database")
}

async function registerNewTruck(truck: truckEntity) {
    await trucksRepository.createTruck(truck)
}

async function getAllTrucks(page?: number, limit?: number){
    if(!page) page = 1
    if(!limit) limit = 15
    return await trucksRepository.findAllTrucks(page, limit)
}

export default {
    truckAlreadyExist,
    registerNewTruck,
    getAllTrucks
}